package sep.grupped.Rest.Table5;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Table5Repository extends JpaRepository <MittlereJahresBevoelkerung, Long> {
  MittlereJahresBevoelkerung findByAmountAll(int amountAll);
  MittlereJahresBevoelkerung findByAmountMale(int amountMale);
  MittlereJahresBevoelkerung findByAmountFemale(int amountFemale);
  MittlereJahresBevoelkerung findByCity(String city);
  MittlereJahresBevoelkerung findByJahr(int jahr);
  MittlereJahresBevoelkerung findByBezirk(String bezirk);
  MittlereJahresBevoelkerung findByState(String state);
}
