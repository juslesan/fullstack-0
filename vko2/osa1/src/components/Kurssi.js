import React from 'react'

const Kurssi = ({ kurssi }) => {
    const rivit = () => kurssi.osat.map(osat =>
        <li key={osat.id}>
          {osat.nimi} {osat.tehtavia}
        </li>
      )
      const result = kurssi.osat.map(osat => osat.tehtavia)
    
      const sum = result.reduce(function (a, b) {
        return a + b;
      }, 0);

      return (
            <div>
                <h1>{kurssi.nimi}</h1>
                {rivit()}
                <p> yhteensä {sum} tehtävää </p>
            </div>
        )
}

export default Kurssi