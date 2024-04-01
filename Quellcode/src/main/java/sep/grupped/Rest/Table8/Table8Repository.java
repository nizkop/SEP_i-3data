package sep.grupped.Rest.Table8;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Table8Repository extends JpaRepository<Geburten, Long> {
  Geburten findByJahr(int jahr);
  Geburten findByGesamt(int gesamt);
  Geburten findByJanuar(int januar);
  Geburten findByFebruar(int februar);
  Geburten findByMaerz(int maerz);
  Geburten findByApril(int april);
  Geburten findByMai(int mai);
  Geburten findByJuni(int juni);
  Geburten findByJuli(int juli);
  Geburten findByAugust(int august);
  Geburten findBySeptember(int september);
  Geburten findByOktober(int oktober);
  Geburten findByNovember(int november);
  Geburten findByDezember(int dezember);
}
