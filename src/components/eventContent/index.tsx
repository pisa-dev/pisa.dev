const EventContent = () => {
  return (
    <>
      <div className="flex flex-col col-span-2 gap-6">
        <p className="mt-8 text-xl text-gray-500 leading-8">
          Quanto costa cercare classicamente un elemento in un array non
          ordinato? Nel peggiore dei casi, dovrai guardare tutti gli elementi
          del tuo array, uno ad uno.
        </p>
      </div>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <p>Questo però non è vero con la computazione quantistica!</p>
        <p>
          In questo talk sarà presentato uno degli algoritmi quantistici più
          dirompenti di tutto il mondo quantum, l’algoritmo di Grover!
        </p>
        <h4>Che cosa fa questo algoritmo?</h4>
        <p>
          Beh! Permette di avere uno speedup polinomiale rispetto alla ricerca
          effettuata dai computer classici.
        </p>
        <h4>Ovvero?</h4>
        <p>
          Astraendo significa che, riesce a trovare l’elemento che stavi
          cercando senza dover guardare tutti gli elementi del tuo array non
          ordinato.
        </p>
        <h4>Come è possibile questa magia?</h4>
        <p>Beh, non ti rimane che venire al talk!</p>

        <h3>Informazioni utili</h3>
        <p>
          Questo è il primo di molti eventi gratuiti di cui si renderà
          protagonista Pisa.dev: la nuova fantastica community degli
          sviluppatori pisani! 🎉🎉
        </p>
        <p>
          Pisa.dev nasce dall{"'"}esigenza di formare un gruppo di
          professionisti, studenti ed appassionati del mondo IT sul territorio
          pisano con il chiaro obiettivo di condividere idee, conoscenze e
          curiosità.
        </p>
        <p>
          L{"'"}evento sarà ospitato da Geckosoft, uno dei principali partner
          della community e sponsor delle sue attività, che ringraziamo per il
          supporto. La sala a nostra disposizione si trova al primo piano del
          centralissimo Casino dei Nobili, in via Borgo Stretto, 3.
        </p>
        <p>
          Terminato l{"'"}evento ci sarà un aperitivo, così da discutere gli
          argomenti trattati (e non), condividere le proprie impressioni e fare
          conoscenza 🍻🍻🍻
        </p>
        <p>
          Ti abbiamo incuriosito? Ottimo, vieni a trovarci venerdì 15 alle ore
          18:30!
        </p>
      </div>
    </>
  );
};

export default EventContent;
