package sep.grupped.Rest.Table3;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Table3Repository extends JpaRepository<Arbeitssuchende, Long> {
  Arbeitssuchende findByDatum(String datum);
  Arbeitssuchende findByCol1(int col1);
  Arbeitssuchende findByCol2(int col2);
  Arbeitssuchende findByCol3(int col3);
  Arbeitssuchende findByCol4(int col4);
  Arbeitssuchende findByCol5(int col5);
  Arbeitssuchende findByCol6(int col6);
  Arbeitssuchende findByCol7(int col7);
  Arbeitssuchende findByCol8(int col8);
  Arbeitssuchende findByCol9(int col9);
  Arbeitssuchende findByCol10(int col10);
  Arbeitssuchende findByCol11(int col11);

}
