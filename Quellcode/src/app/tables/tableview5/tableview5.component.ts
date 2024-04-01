import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MittlereJahresBevoelkerung} from "../../Model/mittlerejahresbev";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data5Service} from "../../services/data5.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
@Component({
  selector: 'app-tableview5',
  templateUrl: './tableview5.component.html',
  styleUrls: ['./tableview5.component.css']
})
export class Tableview5Component implements OnInit, AfterViewInit{
  entries: MittlereJahresBevoelkerung[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: MittlereJahresBevoelkerung = new MittlereJahresBevoelkerung();
  displayedColumns: string[] = ['id','jahr','state', 'bezirk', 'city', 'amountFemale', 'amountMale','amountAll'];
  constructor(private data5Service: Data5Service,
              private _liveAnnouncer: LiveAnnouncer) { }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entries)
    this.getEntries();
  }
  ngAfterViewInit(): void{
    this.dataSource = new MatTableDataSource(this.entries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEntries(): void {
    this.data5Service.getDatensaetze().subscribe((data:  MittlereJahresBevoelkerung[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }

  addEntry(): void {
    if (!this.entryData.jahr || !this.entryData.state || !this.entryData.bezirk || !this.entryData.city || !this.entryData.amountFemale || !this.entryData.amountMale || !this.entryData.amountAll) {
      alert('Please fill in all required fields.');
      return;
    }
    this.data5Service.createEntry(this.entryData).subscribe(() => {
      this.getEntries();
      this.resetEntryData();
    });
  }
  async isXMLValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const firstLine = lines[0].trim();
    const expectedHeader = '<?xml version="1.0" encoding="UTF-8"?><genml:GENESIS xmlns:genml="https://www-genesis.destatis.de/xml/GENESIS-ML_V0_3" NAME="12411-14iz"><genml:DISPLAY-DATA><genml:LABELS><genml:LABEL NAME="UEBERSCHRIFT" POSITION="" VISIBILITY="true"><genml:LEVEL>0</genml:LEVEL><genml:TYPE>UNDEF</genml:TYPE></genml:LABEL><genml:LABEL NAME="12411-14izFOOTNOTE" POSITION="" VISIBILITY="true"><genml:CAPTION><genml:TEXT LANG="de" FORMAT="text/plain">Ab dem Jahr';

    return firstLine.startsWith(expectedHeader);
  }

  async uploadFile(event: Event): Promise<void> {
    event.preventDefault();

    const fileInput = (event.target as HTMLFormElement).elements.namedItem('file') as HTMLInputElement;
    // @ts-ignore
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    if (!(await this.isXMLValid(file))) {
      alert('Invalid CSV format. Please upload a CSV file with the correct column headers.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    //Upload Cooldown
    this.uploadButtonDisabled = true;
    const cooldownTime = 5000; //5 seconds
    setTimeout(() => {
      this.uploadButtonDisabled = false;
    }, cooldownTime);

    try {
      const response = await this.data5Service.uploadFile(file).toPromise();
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again later.');
    }
    window.location.reload();
  }

  updateEntry(): void {
    if (this.entryData.id) {
      if (!this.entryData.jahr || !this.entryData.state || !this.entryData.bezirk || !this.entryData.city || !this.entryData.amountFemale || !this.entryData.amountMale || !this.entryData.amountAll) {
        alert('Please fill in all required fields.');
        return;
      }
      this.data5Service.updateEntry(this.entryData.id, this.entryData).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Please enter an entry ID');
    }
  }

  deleteEntry(): void {
    if (this.entryData.id) {
      this.data5Service.deleteEntry(this.entryData.id).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Please enter an entry ID');
    }
  }

  resetEntryData(): void {
    this.entryData = new MittlereJahresBevoelkerung();
  }
}
