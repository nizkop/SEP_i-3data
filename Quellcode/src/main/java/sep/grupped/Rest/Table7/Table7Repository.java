package sep.grupped.Rest.Table7;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Table7Repository extends JpaRepository<Strassenliste, Long> {
  Strassenliste findByFid(String fid);
  Strassenliste findByStrasse(String strasse);
  Strassenliste findByStrassenschluessel(int strassenschluessel);
  Strassenliste findByGemeindeschluessel(int gemeindeschluessel);
}
