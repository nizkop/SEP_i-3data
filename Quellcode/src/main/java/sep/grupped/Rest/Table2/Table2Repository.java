package sep.grupped.Rest.Table2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Table2Repository extends JpaRepository<Sterbefaelle, Long> {
  Sterbefaelle findByJahr(int jahr);
  Sterbefaelle findByGesamt(int gesamt);
  Sterbefaelle findByJanuar(int januar);
  Sterbefaelle findByFebruar(int februar);
  Sterbefaelle findByMaerz(int maerz);
  Sterbefaelle findByApril(int april);
  Sterbefaelle findByMai(int mai);
  Sterbefaelle findByJuni(int juni);
  Sterbefaelle findByJuli(int juli);
  Sterbefaelle findByAugust(int august);
  Sterbefaelle findBySeptember(int september);
  Sterbefaelle findByOktober(int oktober);
  Sterbefaelle findByNovember(int november);
  Sterbefaelle findByDezember(int dezember);
}
