import React from 'react'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'

var jsPDF = require('jspdf');
require('jspdf-autotable');

class Imprimir2 extends React.Component {

  componentDidMount() {
  }

  CalcularImporte(listado) {

    let pagos = listado;
    let totalimportes = [];

    pagos.forEach(function(element) {
      let importe = 0;
        element.forEach(function(element0){
          importe += element0.importe_tc;
        })
        totalimportes.push(importe);
    });

    console.log(this.props.seleccionado);
    console.log("totalimportes");
    console.log(totalimportes);

    return totalimportes;
  }

  demoTwoPageDocument() {
    var doc = new jsPDF('landscape');
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');
}

    comita(importecito2){

        var trans = 0;
        for (var i = 0; i < importecito2.length; i++) {
              if(importecito2.charAt(i) == '.'){
                  trans = importecito2.length-i;
                  //console.log("trans "+trans+" "+i+" "+importecito2+" "+importecito2.length);
              }
        }

        if(importecito2.length==(4+trans)){
            trans = this.numerasos(trans);
            var importecito = importecito2.substr(0,1)+','+importecito2.substr(1,(3+trans));//console.log(importecito);
          }else if(importecito2.length==(5+trans)){
              trans = this.numerasos(trans);
              var importecito = importecito2.substr(0,2)+','+importecito2.substr(2,(3+trans));//console.log(importecito);
          }else if(importecito2.length==(6+trans)){
              trans = this.numerasos(trans);
              var importecito = importecito2.substr(0,3)+','+importecito2.substr(3,(3+trans));//console.log(importecito);
          }else if(importecito2.length==(7+trans)){
              trans = this.numerasos(trans);
              var importecito = importecito2.substr(0,1)+','+importecito2.substr(1,3)+','+importecito2.substr(4,(3+trans)); //NUNCA VA LLEGAR A ESTO WE
            }
            else{//console.log(importecito2);
              return importecito2;
          }//console.log(importecito+" :v");
          return importecito;
    }

    numerasos(trans){
        if(trans > 3){
            trans = 3;
        }
        return trans;
    }

  arreglosReporte(con,pag){
        var lista = [];
        console.log(con);
        console.log(pag);
        for(let i in con)
        {
          var flag = false;
          var arr = new Array();
          for(let j in pag){

              if(con[i].concepto === pag[j].concepto){
                arr.push(pag[j])
                flag = true;
              }
          }
          if(flag){
            lista.push(arr);
          }
        }

    return lista;
  }

   addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();

    for (let i = 0; i < totalPages; i++) {
      doc.setPage(i);
      //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setTextColor(230);
      doc.setFontSize(45);
      doc.text(90,520 , 'DOCUMENTO SIN VALOR OFICIAL',null,32);
    }

    return doc;
  }


  Imprimir(){


    console.log("dwadwa");
    console.log(this.props.conceptos);



    var checkbox_selec=[];
    var checks=[];
    var nombres = this.props.alumno.apeNom;

    var codigo= this.props.alumno.codigo;
    var importe = 0;
    var listadopagos = this.props.listado;
    var listado = [];
    var listafinal = [];
    var total=[];
    var checks=document.getElementsByClassName("checkbox1");
    var checks_normales=Array.from(checks);


    //DATOS DEL COSTO
    var costoTotal = null;
    var costoEPG = null;
    var costoUPG = null;
    var dcostoTotal = null;
    var dcostoEPG =null;;
    var dcostoUPG = null;
    var costo_TOTAL =null;;
    var dcosto_TOTAL = null;
    var costo_tipo =null;;
    var costo_credito =null;;
    var costo_credito_d =null;;
    var creditos =null;;

    var ciclo = "";
    var d_ciclo = "";

    if(this.props.costos.tipo == "por credito") // // NOTE: estas weas son las que cambian segun el credito o ciclo :v
    {
                 costoTotal = this.props.costos.total;
                 costoEPG = this.props.costos.epg;
                 costoUPG = this.props.costos.upg;
                 dcostoTotal = this.props.costos.d_total;
                 dcostoEPG = this.props.costos.d_epg;
                 dcostoUPG = this.props.costos.d_upg;
                 costo_TOTAL = this.props.costos._Total;
                 dcosto_TOTAL = this.props.costos.d_Total;
                 costo_tipo = this.props.costos.tipo;
                 costo_credito = this.props.costos.costo_credito;
                 costo_credito_d = this.props.costos.costo_credito_d;
                 creditos = this.props.costos.creditos;
    }
    else{
         costoEPG = this.props.costos.epg;
         costoUPG = this.props.costos.upg;
         dcostoEPG = this.props.costos.d_epg;
         dcostoUPG = this.props.costos.d_upg;
         costo_TOTAL = this.props.costos.total;
         dcosto_TOTAL = this.props.costos.d_Total;
         costo_tipo = this.props.costos.tipo;
         ciclo = this.props.costos.ciclo;
         d_ciclo = this.props.costos.d_ciclo;
    }


    checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);
     }
    });

    if(checkbox_selec.length!=0){

      for(let j=0;j<listadopagos.length;j++){
          if(listadopagos[j].check==true){
              total.push(listadopagos[j]); // ya no hay esas weas de chck box
          }
        }

      console.log("wea")
      console.log(total);

      console.log("wea abel")
      console.log(this.props.conceptos);

      listafinal = this.arreglosReporte(this.props.conceptos,total);

      console.log("wea abel :V")
      console.log(this.props.conceptos);
      importe = this.CalcularImporte(listafinal);

      console.log("total")
      console.log(total);
      console.log("listafinal")
      console.log(listafinal);


      var conceptos=[];
      var aux =this.props.conceptos;
      console.log(conceptos[3]);

      for (let j = 0; j<aux.length; j++) {
          conceptos.push(aux[j].concepto);
          console.log("100% real no fake "+j)

      }

    console.log("listado de conceptos obtenidos");
    console.log(conceptos);

      var datosDelformulario=[];




  var listadoFinalFormato = [];

  console.log("LISTA 100 REAL NO FEIK");
  console.log(listafinal);

  //var numeroCambio = 0;

  for (let l = 0; l<listafinal.length; l++) {
    var arrayAuxiliar=[];
    var arrayAntes = listafinal[l];
    var totalizado = 0;
    for (let m = 0; m<arrayAntes.length; m++) {

      if(this.props.seleccionado){

        if(arrayAntes[m].moneda=="108"){
        var pago = [m+1,arrayAntes[m].ciclo.toString(),arrayAntes[m].concepto,arrayAntes[m].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'),"RECIBO",arrayAntes[m].numero
        ,"S/."+this.comita(arrayAntes[m].importe.toString()),"S/."+this.comita(arrayAntes[m].importe_tc.toString()),arrayAntes[m].observacion]
        }
        else{
          var pago = [m+1,arrayAntes[m].ciclo.toString(),arrayAntes[m].concepto,arrayAntes[m].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'),"RECIBO",arrayAntes[m].numero
          ,"$."+this.comita(arrayAntes[m].importe.toString()),"S/."+this.comita(arrayAntes[m].importe_tc.toString()),arrayAntes[m].observacion]

        }
      totalizado = totalizado + arrayAntes[m].importe_tc;
      arrayAuxiliar.push(pago);
      var agregarTotal = [ ,,,,,
        ,"Total","S/."+this.comita(totalizado.toString()),]

      }
      else{
        if(arrayAntes[m].moneda=="108"){
          var pago = [m+1,arrayAntes[m].ciclo.toString(),arrayAntes[m].concepto,arrayAntes[m].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'),"RECIBO",arrayAntes[m].numero,
          "S/."+this.comita(arrayAntes[m].importe.toString()),"S/."+this.comita(arrayAntes[m].importe_tc.toString())]
          }
          else{
            var pago = [m+1,arrayAntes[m].ciclo.toString(),arrayAntes[m].concepto,arrayAntes[m].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'),"RECIBO",arrayAntes[m].numero
            ,"$."+this.comita(arrayAntes[m].importe.toString()),"S/."+this.comita(arrayAntes[m].importe_tc.toString())]

          }
        totalizado = totalizado + arrayAntes[m].importe_tc;
        arrayAuxiliar.push(pago);
        var agregarTotal = [ ,,,,,
          ,"Total","S/."+this.comita(totalizado.toString())]
      }

    }

    arrayAuxiliar.push(agregarTotal);

    listadoFinalFormato.push(arrayAuxiliar);
  }




  console.log("listado final con el formato requerido para generar el pdf");
  console.log(listadoFinalFormato);
  console.log("select"+ this.props.seleccionado);

    if(this.props.seleccionado){
    var columns = ["N°","Ciclo","Concepto","Fecha","Documento","Numero","Importe","Subtotal","Observacion"];
     var columns2 = ["  ","     ","        ","     ","         ","      ","       ","        ","           "];
     var columnsBenf2 = ["  ","         ","            ","         ","     ","             ","        "];

    }

    else{
      var columns = ["N°","Ciclo","Concepto","Fecha","Documento","Numero","Importe","Subtotal"];
      var columns2 = ["  ","     ","        ","     ","         ","      ","       ","        "];
      var columnsBenf2 = ["  ","         ","            ","         ","             ","        "];

    }

    var data = "Hola";

      var doc = new jsPDF('landscape','pt');


            console.log("LOS IMPORTES");
            console.log(importe);

            var sumitaDeImportes = 0;
            for(var x=0;x<importe.length;x++){
              sumitaDeImportes=sumitaDeImportes+importe[x];
            }

            sumitaDeImportes = sumitaDeImportes.toFixed(2);

            console.log("TOTAL DE LOS IMPORTES xdxdxd");
            console.log(sumitaDeImportes);


            console.log("LOS CONCEPTOS FEIK");
            console.log(conceptos);


    if(this.props.datos.length>0){

      var listadoFinalBeneficio = [];
      console.log("Cantidad de beneficio");
      console.log(this.props.datos.length);

     for (let m = 0; m<this.props.datos.length; m++) {

        var beneficio_ = [m+1,this.props.datos[m].benef_otrogado,this.props.datos[m].autorizacion,
        this.props.datos[m].condicion,this.props.datos[m].fecha,
        this.props.datos[m].resolucion]

        listadoFinalBeneficio.push(beneficio_);
    }

console.log("listado final del benefico para el reporte del pdf");
console.log(listadoFinalBeneficio);

      doc.autoTable(columnsBenf2, listadoFinalBeneficio, {
        theme: 'grid',
        styles: {
            cellPadding: 5, // a number, array or object (see margin below)
            fontSize: 8,
            font: "helvetica", // helvetica, times, courier
            lineColor: 0,
            lineWidth: 0,
            fontStyle: 'normal', // normal, bold, italic, bolditalic
            overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
            fillColor: false, // false for transparent or a color as described below
            textColor: 300,
            halign: 'center', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        },
        headerStyles: {fillColor: [300, 300, 300],
        textColor:0,
        fontStyle:'bold'},
        startY : 380,
        showHeader:'firstPage'

    });

      var first = doc.autoTable.previous;



    //Mostramos el encabezado de la primera tabla
        doc.autoTable(columns2, listadoFinalFormato[0], {
          theme: 'grid',
          styles: {
              cellPadding: 5, // a number, array or object (see margin below)
              fontSize: 8,
              font: "helvetica", // helvetica, times, courier
              lineColor: 0,
              lineWidth: 0,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
              fillColor: false, // false for transparent or a color as described below
              textColor: 300,
              halign: 'center', // left, center, right
              valign: 'middle', // top, middle, bottom
              columnWidth: 'auto' // 'auto', 'wrap' or a number
          },
          headerStyles: {fillColor: [300, 300, 300],
          textColor:0,
          fontStyle:'bold'},
          startY : first.finalY + 30,
          showHeader:'firstPage'

      });



        for (let k = 1; k<listadoFinalFormato.length; k++) {
          var first = doc.autoTable.previous;

          doc.autoTable(columns2, listadoFinalFormato[k], {
            theme: 'grid',
            styles: {
                cellPadding: 5, // a number, array or object (see margin below)
                fontSize: 8,
                font: "helvetica", // helvetica, times, courier
                lineColor: 0,
                lineWidth: 0,
                fontStyle: 'normal', // normal, bold, italic, bolditalic
                overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                fillColor: false, // false for transparent or a color as described below
                textColor: 300,
                halign: 'center', // left, center, right
                valign: 'middle', // top, middle, bottom
                columnWidth: 'auto' // 'auto', 'wrap' or a number
            },
            headerStyles: {fillColor: [300, 300, 300],
            textColor:0,
            fontStyle:'bold'},
            startY : first.finalY + 30,
            showHeader:'firstPage'
        });

      }
      }else{

        doc.autoTable(columns2, listadoFinalFormato[0], {
          theme: 'grid',
          styles: {
              cellPadding: 5, // a number, array or object (see margin below)
              fontSize: 8,
              font: "helvetica", // helvetica, times, courier
              lineColor: 0,
              lineWidth: 0,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
              fillColor: false, // false for transparent or a color as described below
              textColor: 300,
              halign: 'center', // left, center, right
              valign: 'middle', // top, middle, bottom
              columnWidth: 'auto' // 'auto', 'wrap' or a number
          },
          headerStyles: {fillColor: [300, 300, 300],
          textColor:0,
          fontStyle:'bold'},
          startY : 400,
          showHeader:'firstPage'

      });

      for (let k = 1; k<listadoFinalFormato.length; k++) {
        var first = doc.autoTable.previous;

        doc.autoTable(columns2, listadoFinalFormato[k], {
          theme: 'grid',
          styles: {
              cellPadding: 5, // a number, array or object (see margin below)
              fontSize: 8,
              font: "helvetica", // helvetica, times, courier
              lineColor: 0,
              lineWidth: 0,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
              fillColor: false, // false for transparent or a color as described below
              textColor: 300,
              halign: 'center', // left, center, right
              valign: 'middle', // top, middle, bottom
              columnWidth: 'auto' // 'auto', 'wrap' or a number
          },
          headerStyles: {fillColor: [300, 300, 300],
          textColor:0,
          fontStyle:'bold'},
          startY : first.finalY + 30,
          showHeader:'firstPage'
      });

    }

    }

        //FOOTER
        var pageCount = doc.internal.getNumberOfPages();

        for( let n = 0; n < pageCount; n++) {


        doc.setPage(n);

        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setTextColor(230);
        doc.setFontSize(45);
        doc.text(90,520 , 'DOCUMENTO SIN VALOR OFICIAL',null,32);
        doc.setTextColor(0);
        doc.setFontSize(10);
        doc.text(35,585,listafinal[0][0].sigla_programa);
        doc.text(65,585,"-");
        doc.text(75,585,nombres);
        doc.text(125,585,"-");
        doc.text(135,585,listafinal[0][0].apeNom);
        doc.text(700,585,"SIGAP v.1.0");
        doc.text(800,585, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(35, 576,816, 576);

      }


      doc.setPage(1);
      doc.setTextColor(0);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(11);
      doc.text("UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS", 90, 25);


    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Facultad de Ingeniería de Sistemas e Informática", 90, 40);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Vicedecanato de Investigacion y Posgrado", 90, 55);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Unidad de Posgrado", 90, 70);

    var f = new Date();

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(":", 745, 25);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(":", 745, 40);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Fecha", 710, 25);
    doc.setFontType("normal");
    doc.text(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(), 760, 25);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Hora", 710, 40);
    doc.setFontType("normal");
    doc.text(f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(), 760, 40);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(12);
    doc.text("ESTADO DE PAGOS", 350, 100);


    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 120,750, 120);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 115, 35, 120);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text("Datos Personales", 37, 118);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 140);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 160);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 180);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 140);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 160);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Codigo", 35, 140);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Periodo de Ingreso", 500, 140);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Nombres y Apellidos", 35, 160);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("DNI", 500, 160);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Programa", 35, 180);

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(nombres, 150, 140);

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(listafinal[0][0].apeNom, 150, 160);

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(listafinal[0][0].nomPrograma, 150, 180);

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(listafinal[0][0].anio_ingreso, 610, 140); //AQUI VA EL PERIODO DE INGRESO

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    if(listafinal[0][0].dni==null){
      doc.text("null", 610, 160);
    }
    else{
      doc.text("", 610, 160); //AQUI VA EL DNI
    }


     //TERCER CUADRO DE INFORMACION

     doc.setDrawColor(0, 0, 0);
     doc.setLineWidth(0.5);
     doc.line(35, 212,750, 212);

     doc.setDrawColor(0, 0, 0);
     doc.setLineWidth(0.5);
     doc.line(35, 207, 35, 212);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text("Datos del Costo del Programa", 37, 210);
/*
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Costo Real", 35, 230);
*/
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Matricula UPG", 35, 250);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Matricula EPG", 35, 270);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 250);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 270);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 290);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 140, 310);

    if(costo_tipo=="por credito"){

        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(9);
        doc.text("Costo Real", 35, 230);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Valor por credito", 35, 330);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(8);
      doc.text(":", 140, 330);

      if(costo_credito!=null){
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text(creditos.toString()+" x "+costo_credito.toString(), 160, 330); //AQUI VA EL TOTAL DEL COSTO REAL
      }else{
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text("", 160, 330); //AQUI VA EL TOTAL DEL COSTO REAL
      }

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Valor por credito", 500, 330);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Descuento aplicado", 500, 350);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 330);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 350);

    if(costo_credito_d!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text(creditos+" x "+costo_credito_d, 620, 330);
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 620, 330);
    }

    if(costo_tipo!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text(costo_tipo, 620, 350); //AQUI VA EL TOTAL DEL COSTO FINAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 620, 350); //AQUI VA EL TOTAL DEL COSTO FINAL
    }

    doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Derecho Enseñanza", 500, 290);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Derecho Enseñanza", 35, 290);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Total", 35, 310);

      doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Total", 500, 310);



}else{  // supongo que en este else, por algun lado, va la wea del ciclo
    //AQUI ES EL ELSE DEL POR CREDITO :vV
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(9);
        doc.text("Costo Real(Ciclo)", 35, 230);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Descuento aplicado", 500, 330);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(8);
      doc.text(":", 600, 330);

      if(costo_tipo!=null){
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text(costo_tipo, 620, 330); //AQUI VA EL TOTAL DEL COSTO FINAL
      }else{
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text("", 620, 330); //AQUI VA EL TOTAL DEL COSTO FINAL
      }

      if(ciclo!=null){
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
       doc.text("S/. "+this.comita(ciclo.toString()), 160, 290); //AQUI VA EL TOTAL DEL COSTO FINAL
      }else{
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text("", 620, 330); //AQUI VA EL TOTAL DEL COSTO FINAL
      }

      if(d_ciclo!=null){
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text("S/. "+this.comita(d_ciclo.toString()), 620, 290); //AQUI VA EL TOTAL DEL COSTO FINAL
      }else{
        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(9);
        doc.text("", 620, 290); //AQUI VA EL TOTAL DEL COSTO FINAL
      }

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Derecho Enseñanza", 500, 290);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Derecho Enseñanza", 35, 290);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(9);
      doc.text("Total", 35, 310);

      doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Total", 500, 310);


    }


    if(costoUPG!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(costoUPG.toString()), 160, 250); //AQUI VA LA MATRICULA UPG DEL COSTO REAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 160, 250); //AQUI VA LA MATRICULA UPG DEL COSTO REAL
    }

    if(costoEPG!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(costoEPG.toString()), 160, 270); //AQUI VA LA MATRICULA EPG DEL COSTO REAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 160, 270); //AQUI VA LA MATRICULA EPG DEL COSTO REAL
    }

    if(costoTotal!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(costoTotal.toString()), 160, 290); //AQUI VA EL DERECHO DE ENSEÑANZA DEL COSTO REAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 160, 310); //A //AQUI VA EL DERECHO DE ENSEÑANZA DEL COSTO REAL
    }

    if(costo_TOTAL!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(costo_TOTAL.toString()), 160, 310); //AQUI VA EL TOTAL DEL COSTO REAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 160, 310); //AQUI VA EL TOTAL DEL COSTO REAL
    }


    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Costo Final", 500, 230);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Matricula UPG", 500, 250);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Matricula EPG", 500, 270);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 250);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 270);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 290);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 600, 310);


    if(dcostoUPG!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(dcostoUPG.toString()), 620, 250); //AQUI VA LA MATRICULA UPG DEL COSTO FINAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 620, 250); //AQUI VA LA MATRICULA UPG DEL COSTO FINAL
    }

    if(dcostoEPG!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(dcostoEPG.toString()), 620, 270); //AQUI VA LA MATRICULA EPG DEL COSTO FINAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 620, 270); //AQUI VA LA MATRICULA EPG DEL COSTO FINAL
    }


    if(dcostoTotal!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(dcostoTotal.toString()), 620, 290); //AQUI VA EL DERECHO DE ENSEÑANZA DEL COSTO FINAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 620, 290); //AQUI VA EL DERECHO DE ENSEÑANZA DEL COSTO FINAL
    }

    if(dcosto_TOTAL!=null){
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("S/. "+this.comita(dcosto_TOTAL.toString()), 620, 310); //AQUI VA EL TOTAL DEL COSTO FINAL
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text("", 620, 310); //AQUI VA EL TOTAL DEL COSTO FINAL
    }



    var imgData = 'data:image/jpeg;base64,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';

    doc.addImage(imgData, 'JPG', 35, 12, 50, 60);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 374,750, 374);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 369, 35, 374);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text("Datos del Beneficio", 37, 370);

        if(this.props.datos.length>0){

          var listadoFinalBeneficio = [];
          console.log("Cantidad de beneficio");
          console.log(this.props.datos.length);

         for (let m = 0; m<this.props.datos.length; m++) {

            var beneficio_ = [m+1,this.props.datos[m].benef_otrogado+"%",this.props.datos[m].autorizacion,
            this.props.datos[m].condicion,this.props.datos[m].fecha,
            this.props.datos[m].resolucion]

            listadoFinalBeneficio.push(beneficio_);
        }

  console.log("listado final del benefico para el reporte del pdf");
  console.log(listadoFinalBeneficio);




          var columnsBenf = ["N°","Beneficio","Autorizacion","Condicion","Fecha","Resolucion"];

          doc.autoTable(columnsBenf, listadoFinalBeneficio, {
            theme: 'grid',
            styles: {
                cellPadding: 5, // a number, array or object (see margin below)
                fontSize: 8,
                font: "helvetica", // helvetica, times, courier
                lineColor: 0,
                lineWidth: 0.5,
                fontStyle: 'normal', // normal, bold, italic, bolditalic
                overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                fillColor: false, // false for transparent or a color as described below
                textColor: 0,
                halign: 'center', // left, center, right
                valign: 'middle', // top, middle, bottom
                columnWidth: 'auto' // 'auto', 'wrap' or a number
            },
            headerStyles: {fillColor: [180, 180, 180],
            textColor:0,
            fontStyle:'bold'},
            startY : 380,
            showHeader:'firstPage'

        });

          var first = doc.autoTable.previous;

           //Mostramos el encabezado de la primera tabla
           doc.setFont("helvetica");
           doc.setFontType("bold");
           doc.setFontSize(10);
           doc.text("PAGO POR CONCEPTO "+conceptos[0],38,first.finalY + 25);



           /*
           //linea horizontal
           doc.setDrawColor(0, 0, 0);
           doc.setLineWidth(0.5);
           doc.line(35,first.finalY + 28 ,200,first.finalY + 28);
           //linea vertical
           doc.setDrawColor(0, 0, 0);
           doc.setLineWidth(0.5);
           doc.line(35, first.finalY + 22, 35, first.finalY + 28);*/

        //Mostramos el encabezado de la primera tabla
            doc.autoTable(columns, listadoFinalFormato[0], {
              theme: 'grid',
              styles: {
                  cellPadding: 5, // a number, array or object (see margin below)
                  fontSize: 8,
                  font: "helvetica", // helvetica, times, courier
                  lineColor: 0,
                  lineWidth: 0.5,
                  fontStyle: 'normal', // normal, bold, italic, bolditalic
                  overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                  fillColor: false, // false for transparent or a color as described below
                  textColor: 0,
                  halign: 'center', // left, center, right
                  valign: 'middle', // top, middle, bottom
                  columnWidth: 'auto' // 'auto', 'wrap' or a number
              },
              headerStyles: {fillColor: [180, 180, 180],
              textColor:0,
              fontStyle:'bold'},
              startY : first.finalY + 30,
              showHeader:'firstPage'

          });

            if(listadoFinalFormato.length==1){

              var first = doc.autoTable.previous;
              doc.setFont("helvetica");
              doc.setFontType("bold");
              doc.setFontSize(11);
              doc.text("TOTAL CANCELADO: S/."+this.comita(sumitaDeImportes.toString()),620,first.finalY+25);
            }

            for (let k = 1; k<listadoFinalFormato.length; k++) {
              var first = doc.autoTable.previous;

              //Mostramos el encabezado de cada tabla
              doc.setFont("helvetica");
              doc.setFontType("bold");
              doc.setFontSize(10);
              doc.text("PAGO POR CONCEPTO "+conceptos[k],38, first.finalY + 25);
              console.log("pago por concepto");
/*
                 //linea horizontal
              doc.setDrawColor(0, 0, 0);
              doc.setLineWidth(0.5);
              doc.line(35,first.finalY + 28 ,200,first.finalY + 28 );

                //linea vertical
              doc.setDrawColor(0, 0, 0);
              doc.setLineWidth(0.5);
              doc.line(35, first.finalY + 22, 35, first.finalY + 28);*/

              //Mostramos el encabezado de cada tabla

              doc.autoTable(columns, listadoFinalFormato[k], {
                theme: 'grid',
                styles: {
                    cellPadding: 5, // a number, array or object (see margin below)
                    fontSize: 8,
                    font: "helvetica", // helvetica, times, courier
                    lineColor: 0,
                    lineWidth: 0.5,
                    fontStyle: 'normal', // normal, bold, italic, bolditalic
                    overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                    fillColor: false, // false for transparent or a color as described below
                    textColor: 0,
                    halign: 'center', // left, center, right
                    valign: 'middle', // top, middle, bottom
                    columnWidth: 'auto' // 'auto', 'wrap' or a number
                },
                headerStyles: {fillColor: [180, 180, 180],
                textColor:0,
                fontStyle:'bold'},
                startY : first.finalY + 30,
                showHeader:'firstPage'
            });

              if(k==listadoFinalFormato.length-1){
                var first = doc.autoTable.previous;
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize(11);
                doc.text("TOTAL CANCELADO: S/."+this.comita(sumitaDeImportes.toString()),620,first.finalY+25);
              }


          }
          }else{
            doc.setFont("helvetica");
            doc.setFontType("normal");
            doc.setFontSize(10);
            doc.text("No se encontraron datos del beneficio", 35, 390);


            //Mostramos el encabezado de la primera tabla
           doc.setFont("helvetica");
           doc.setFontType("bold");
           doc.setFontSize(10);
           doc.text("PAGO POR CONCEPTO "+conceptos[0],38,420);


        //Mostramos el encabezado de la primera tabla
            doc.autoTable(columns, listadoFinalFormato[0], {
              theme: 'grid',
              styles: {
                  cellPadding: 5, // a number, array or object (see margin below)
                  fontSize: 8,
                  font: "helvetica", // helvetica, times, courier
                  lineColor: 0,
                  lineWidth: 0.5,
                  fontStyle: 'normal', // normal, bold, italic, bolditalic
                  overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                  fillColor: false, // false for transparent or a color as described below
                  textColor: 0,
                  halign: 'center', // left, center, right
                  valign: 'middle', // top, middle, bottom
                  columnWidth: 'auto' // 'auto', 'wrap' or a number
              },
              headerStyles: {fillColor: [180, 180, 180],
              textColor:0,
              fontStyle:'bold'},
              startY : 425,
              showHeader:'firstPage'

          });

            if(listadoFinalFormato.length==1){

              var first = doc.autoTable.previous;
              doc.setFont("helvetica");
              doc.setFontType("bold");
              doc.setFontSize(11);
              doc.text("TOTAL CANCELADO: S/."+this.comita(sumitaDeImportes.toString()),620,first.finalY+20);
            }

            for (let k = 1; k<listadoFinalFormato.length; k++) {
              var first = doc.autoTable.previous;

              //Mostramos el encabezado de cada tabla
              doc.setFont("helvetica");
              doc.setFontType("bold");
              doc.setFontSize(10);
              doc.text("PAGO POR CONCEPTO "+conceptos[k],38, first.finalY + 25);
              console.log("pago por concepto");


              //Mostramos el encabezado de cada tabla

              doc.autoTable(columns, listadoFinalFormato[k], {
                theme: 'grid',
                styles: {
                    cellPadding: 5, // a number, array or object (see margin below)
                    fontSize: 8,
                    font: "helvetica", // helvetica, times, courier
                    lineColor: 0,
                    lineWidth: 0.5,
                    fontStyle: 'normal', // normal, bold, italic, bolditalic
                    overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                    fillColor: false, // false for transparent or a color as described below
                    textColor: 0,
                    halign: 'center', // left, center, right
                    valign: 'middle', // top, middle, bottom
                    columnWidth: 'auto' // 'auto', 'wrap' or a number
                },
                headerStyles: {fillColor: [180, 180, 180],
                textColor:0,
                fontStyle:'bold'},
                startY : first.finalY + 30,
                showHeader:'firstPage'
            });

              if(k==listadoFinalFormato.length-1){
                var first = doc.autoTable.previous;
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize(11);
                doc.text("TOTAL CANCELADO: S/."+this.comita(sumitaDeImportes.toString()),620,first.finalY+20);
              }


          }
        }
      var string = doc.output('datauristring');
      var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    }
    else{
      swal("Seleccione al menos un estado de pago","","info");
      }
    }

    render() {

      return (
        <div>
          <button  onClick={() => this.Imprimir()} className=" waves-effect waves-light btn-large imprimir ">Imprimir<i className="large material-icons left">local_printshop</i></button>
        </div>

      )
    }
}
export default Imprimir2;
