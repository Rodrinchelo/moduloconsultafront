import React from 'react'

class AR_tableHeaderPendientes extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return(
            <thead>
                <tr>
                    <th className="th">Nro</th>
                    <th className="th">Nombre Apellido</th>
                    <th className="th">Concepto</th>
                    <th className="th">Recibo</th>
                    <th className="th">Moneda</th>
                    <th className="th">Importe</th>
                    <th className="th">Fecha</th>
                    <th className="th">Estado</th>
                    <th className="th">Codigo / Programa a escoger</th>
                    <th className="th">Buscar</th>
                    <th className="th">Guardar</th>
                </tr>
            </thead>
        )
    }

}
export default AR_tableHeaderPendientes