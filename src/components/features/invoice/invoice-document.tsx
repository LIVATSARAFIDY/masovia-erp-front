import { formatAmountWithDecimal } from "@/lib/utils"
import type { InvoiceDocumentType } from "@/type"
import {
    Document,
    Page,
    View,
    Text
} from "@react-pdf/renderer"
import { type FunctionComponent } from "react"
type DocumentProps = {
    data: InvoiceDocumentType
}
const InvoiceDocument: FunctionComponent<DocumentProps> = ({data}) => {
    
    return (
        <Document>
            <Page size="A4" style={{padding: 40,fontSize: 12,fontFamily: 'Helvetica',}} >
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 20,fontWeight: 'bold'}}>Masovia</Text>
                    </View>
                    <View><Text style={{fontSize: 50,fontWeight: 'bold'}}>Facture</Text></View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'flex-end' }} >
                    <View>
                        <Text style={{fontWeight: 'bold'}}>Date de facturation: { data.invoiceDate }</Text>
                        <Text style={{fontWeight: 'bold'}}>Date d'écheance: {data.dueDate}</Text>
                    </View>
                    <View><Text style={{fontWeight: 'bold'}}>FACTURE NUMERO: {data.invoiceNumber}</Text></View>
                </View>
                <View style={{border: '2px solid black', marginBottom: 20}} ></View>
                <View style={{display: 'flex', gap:5 ,flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View style={{width: '50%'}}>
                        <Text style={{fontWeight: 'bold', marginBottom:10 }}>EMETTEUR:</Text>
                        <Text>LIVATSARAFIDY Pierre Thomas</Text>
                        <Text>pierrethomas2liva@gmail.com</Text>
                        <Text>033 35 637 58</Text>
                        <Text>Amborovy Tsiadana Vontovorona</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '50%'}}>
                        <Text style={{fontWeight: 'bold', marginBottom:10 }}>DESTINATAIRE: </Text>
                        <Text>{data.client.name}</Text>
                        <Text>{data.client.email}</Text>
                        <Text>{data.client.phone}</Text>
                        <Text>{data.client. address}</Text>
                        {
                            data.client.company.trim() !== '' ? <Text>{data.client. company}</Text> : (<></>)
                        }
                        
                    </View>
                </View>
                <View style={{display: 'flex',width: 'auto',marginVertical: 10,}}>
                    <View style={{
                        flexDirection: 'row',
                        borderBottom: '1 solid #ccc',
                        paddingVertical: 4,
                        backgroundColor: '#eee',
                        fontWeight: 'bold',
                    }}>
                        {/* <Text style={{ width: '40%'}}>Image</Text> */}
                        <Text style={{ width: '40%' }}>Produit</Text>
                        <Text style={{ width: '20%' }}>Prix unitaire</Text>
                        <Text style={{ width: '10%' }}>Qt</Text>
                        <Text style={{ width: '20%' }}>Total</Text> 
                    </View>

                    {data.products.map((item, i) => (
                        <View style={{flexDirection: 'row' ,borderBottom: '1 solid #ccc',paddingVertical: 4,}} key={i}>
                            {/* <Image src={item.image} style={{ width: '40%', height: 60 }} /> */}
                            <Text style={{ width: '40%', paddingLeft:5, paddingRight:5 }}>{item.description}</Text>
                            <Text style={{ width: '20%', paddingLeft:5, paddingRight:5 }}>{item.unitPrice.toFixed(2)} €</Text>
                            <Text style={{ width: '10%', paddingLeft:5, paddingRight:5 }}>{item.quantity}</Text>
                            <Text style={{ width: '20%', paddingLeft:5, paddingRight:5 }}>{(item.unitPrice * item.quantity).toFixed(2)} €</Text>
                        </View>
                    ))}
                </View>
                <View style={{marginTop: 20, alignItems: 'flex-end'}}>
                    <Text>Total HT : {formatAmountWithDecimal((data.totalHT).toFixed(2))} {data.currency}</Text>
                    { data.tva ? <Text>TVA ({data.tva}%) {formatAmountWithDecimal((data.totalHT * (data.tva/100)).toFixed(2))}  { data.currency }</Text> :<></> }
                    { data.discount ? <Text>Remise ({data.discount}%) {formatAmountWithDecimal((data.totalHT * (data.discount/100)).toFixed(2))}  { data.currency }</Text> :<></> }
                    <Text>Total TTC : {formatAmountWithDecimal((data.totalHT * (1+ ( data.tva ? data.tva/100 : 0 ) - ( data.discount ? data.discount/100 : 0) )  ).toFixed(2))} { data.currency }</Text>
                </View>
                {
                    data.notes.trim() !== '' ? (
                        <View style={{marginTop: 20}}>
                            <Text>{data.notes}</Text>
                        </View>
                    ): <></>
                }
            </Page>
        </Document>
    )
}

export default InvoiceDocument