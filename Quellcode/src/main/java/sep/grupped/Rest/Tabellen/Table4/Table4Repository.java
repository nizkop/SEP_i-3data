package sep.grupped.Rest.Tabellen.Table4;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Table4Repository extends JpaRepository<Arbeitslose, Long> {
  Arbeitslose findByDatum(String datum);
  Arbeitslose findByCol1(int col1);
  Arbeitslose findByCol2(int col2);
  Arbeitslose findByCol3(int col3);
  Arbeitslose findByCol4(int col4);
  Arbeitslose findByCol5(int col5);
  Arbeitslose findByCol6(int col6);
  Arbeitslose findByCol7(int col7);
  Arbeitslose findByCol8(int col8);
  Arbeitslose findByCol9(int col9);
  Arbeitslose findByCol10(int col10);
  Arbeitslose findByCol11(int col11);
  Arbeitslose findByCol12(int col12);
}
