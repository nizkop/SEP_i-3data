package sep.grupped.Rest.Table1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Table1Repository extends JpaRepository<VnNeugeboreneAC, Long> {
    VnNeugeboreneAC findByVorname(String vorname);
    VnNeugeboreneAC findByGeschlecht(String geschlecht);
    VnNeugeboreneAC findByGeschlecht(int position);
    VnNeugeboreneAC findByAnzahl(int anzahl);
}
