package sep.grupped.Rest.geoData;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GeoDataRepository extends JpaRepository <GeoDatenPunkt, Long> {
  GeoDatenPunkt findByGeometry(String geometry);
  GeoDatenPunkt findByLaengengrad(double laengengrad);
  GeoDatenPunkt findByBreitengrad(double breitengrad);
  GeoDatenPunkt findByArt(String art);
  GeoDatenPunkt findByKoordinatensystem(String koordinatensystem);
  GeoDatenPunkt findByOrtsbeschreibung(String ortsbeschreibung);
  GeoDatenPunkt findByIcon(String icon);
}
