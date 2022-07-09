import type { NextPage } from "next";
import Head from "next/head";
import { CentralContent } from "../components/CentralContent";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>pisa.dev - Codice di condotta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <CentralContent title="Codice di Condotta">
          <div>
            <h4>Obiettivo</h4>
            <p>
              Un obiettivo cardine di tutte le attività organizzate da Pisa.dev
              è quello di essere inclusivo rispetto alla maggioranza dei
              partecipanti, con il più diverso e variegato background possibile.
              Ci impegnamo a garantire un ambiente sicuro ed amichevole per
              tutti, indipendentemnte da genere, orientamento sessuale, etnia,
              stato socioeconomico e religione (o la sua assenza). Questo codice
              di condotta delinea le nostre aspettative per tutti coloro che
              partecipano alla nostra community, così come le conseguenze in
              caso di comportamenti inammissibili. Invitiamo tutti i
              partecipanti alla nostra community di aiutarci a creare esperienze
              positive e sicure per tutti.{" "}
            </p>

            <h4>Comportamento Atteso</h4>
            <p>
              I seguenti comportamenti sono attesi e richiesti da tutti i membri
              della communiy:
            </p>
            <ul>
              <li>
                Partecipa in modo autentico e attivo. Così facendo, contribuisci
                alla salute e alla longevità di questa community
              </li>
              <li>
                Esercitate attenzione e rispetto nel modo di parlare e nelle
                vostre azioni.
              </li>
              <li>Cercare sempre la collaborazione prima di conflitti</li>
              <li>
                Astenersi da comportamenti e discorsi avvilenti, discriminatori
                o molesti.
              </li>
              <li>
                Fai attenzione a ciò alle situazioni ed agli altri partecipanti.
                Avvisa i responsabili della community se noti una situazione
                pericolosa, qualcuno in difficoltà o violazioni di questo codice
                di condotta, anche se sembrano irrilevanti.
              </li>
            </ul>

            <h4> Comportamento Inammissibile</h4>
            <p>
              Le seguenti azioni sono considerate molestie e sono inaccettabili
              nella nostra community:
            </p>
            <ul>
              <li>
                Violenza, minacce di violenza o linguaggio violento ai danni di
                altre persone
              </li>
              <li>
                Battute e linguaggio sessista, razzista, omofobo, transfobico o
                comunque discriminatorio.
              </li>
              <li>
                Pubblicare o mostrare materiale sessualmente esplicito o
                violento.
              </li>
              <li>
                Pubblicare o minacciare di pubblicare informazioni di personali
                di altre persone.
              </li>
              <li>
                Insulti personali, in particolare quelli relativi a sesso,
                orientamento sessuale, razza, religione o disabilità.
              </li>
              <li>Fotografie o registrazioni inappropriate.</li>
              <li>
                Contatto fisico inappropriato. È necessario avere il consenso di
                qualcuno prima di toccarlo.
              </li>
              <li>
                Attenzione sessuale indesiderata. Questo include commenti o
                battute a sfondo sessuale; palpeggiamenti e avance sessuali
                indesiderate.
              </li>
              <li>
                Intimidazioni, stalking o pedinamento (online o di persona).
              </li>
              <li>
                Promozione o incoraggiamento di uno qualsiasi dei comportamenti
                di cui sopra.
              </li>
              <li>
                Disturbo duraturo durante le attività della community, inclusi
                discorsi e presentazioni.{" "}
              </li>
            </ul>

            <h4>Conseguenze a Comportamenti Inammissibili</h4>
            <p>
              Un comportamento inammissibile da parte di qualsiasi membro della
              community, compresi gli sponsor e coloro che hanno autorità
              decisionale, non sarà tollerato. Chiunque venga invitato a
              interrompere un comportamento inammissibile è tenuto a conformarsi
              immediatamente. Se un membro della community si impegna in un
              comportamento inammissibile, gli organizzatori della community
              possono intraprendere qualsiasi azione che ritengono appropriata,
              fino ad includere un divieto temporaneo o permanente dalla
              community senza preavviso (e senza rimborso nel caso di un evento
              a pagamento).
            </p>
            <h4>Scopo</h4>
            <p>
              Ci aspettiamo che tutti i partecipanti della community si
              attengano a questo codice di condotta in tutte le sedi della
              community - online e di persona - così come in tutte le
              comunicazioni individuali relative alle attività della community.
              Questo codice di condotta e le relative procedure si applicano
              anche a comportamenti inaccettabili che si verificano al di fuori
              delle attività della community quando tali comportamenti hanno il
              potenziale di influenzare negativamente la sicurezza e il
              benessere dei membri della community.
            </p>
          </div>
        </CentralContent>
      </main>
      <Footer />
    </>
  );
};

export default Home;
