import { Button } from "@/components/ui/button"
import { getDefaultCurrencies } from "@/service/invoieService"
import { useQuery } from "@tanstack/react-query"
import { InputWithLabel } from "@/components/input-with-label";
import { Calendar29 } from "@/components/date-picker";
import { Fragment, useEffect, useRef, useState } from "react";
import { formatAmountWithDecimal, formatDate } from "@/lib/utils";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,  DropdownMenuContent, DropdownMenuLabel,DropdownMenuRadioGroup,DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card, CardContent,
} from "@/components/ui/card"
import { TextareaWithLabel } from "@/components/textarea-with-label";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { CirclePlus, Download, Send, Trash2 } from "lucide-react";
import type { ClientInvoice, ExchangeRate, InvoiceDocumentType, Product } from "@/type";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { pdf } from "@react-pdf/renderer";
import { saveAs  } from "file-saver"
import InvoiceDocument from "./invoice-document";
import { Label } from "@/components/ui/label";

const Invoice = () => {
    const today = new Date();
    const nexMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
    const exchangeRate = useQuery({
        queryKey: ['exchangeRate'], 
        queryFn: async () => {
            const res = await getDefaultCurrencies()
            return res
        },
    })
    const [client, setClient] = useState<ClientInvoice>({
        name: '',
        email: '',
        address: '',
        phone: '',
        company: '',
        logo:''
    });
    
    const [products, setProducts] = useState<Product[]>([]);
    const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
    const [invoiceDate, setInvoiceDate] = useState( formatDate(today)); 
    const [dueDate, setDueDate] = useState( formatDate(nexMonth));
    const [rateCurrency, setRateCurrency] = useState<{currency:string, rate:number}[]>([])
    const [currencyActive, setCurrencyActive] = useState<string>('');
    const [tva, setTva] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [totalHT, setTotalHt] = useState(0)
    const [notes, setNotes] = useState<string>('')
    const [visibleImages, setVisibleImages] = useState<boolean[]>([]);
    const [titleLogoImage, setTitleLogoImage] = useState<string|null>(null)

    
    const baseCurrency = useRef<string>('');
    const fileInputRef = useRef<(HTMLInputElement | null)[]>([])
    const imageRef = useRef<(HTMLImageElement | null)[]>([]);
    const logoRef = useRef<HTMLInputElement>(null)

    const addProduct = () => {
        const ids = products.map(product => product.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        const newProduct: Product = {
            id: maxId + 1,
            description: '',
            quantity: 1,
            unitPrice: 1
        };
        const productsTemp = [...products, newProduct]
        const totalTemp = calculateTotal2(productsTemp)
        setTotalHt(totalTemp)
        setProducts(productsTemp);
    };

    const removeProduct = (id: number) => {
        const productsTemp = products.filter((product) => product.id !== id)
        const totalTemp = calculateTotal2(productsTemp) 
        setProducts(productsTemp);
        setTotalHt(totalTemp)
        setVisibleImages((prev) => {
            const newState = [...prev];
            newState[id] = false;
            return newState;
        });
    };

    const updateProduct = (id: number, field: keyof Product, value: string | number) => {
        const productsTemp = products.map((product) => {
            if (product.id === id) {
                return { ...product, [field]: value };
            }
            return product;
        }) 
        const totalTemp = calculateTotal2(productsTemp)
        setTotalHt(totalTemp) 
        setProducts(productsTemp);
    };

    const changeCurrency = (currency: string) => {
        let prevCurrency = ''
        setCurrencyActive(prev => {
            prevCurrency = prev
            return currency
        })
        
        const currencyFound = rateCurrency.find(cur => cur.currency === currency )
        const currencyFound2 = rateCurrency.find(cur => cur.currency === prevCurrency )
        
        const productsTemp = products.map((product) => {
            // base => device
            if(currencyFound && prevCurrency === baseCurrency.current && currency !== baseCurrency.current){
                product.unitPrice = Number((product.unitPrice / (1/currencyFound.rate)).toFixed(2))
            }
            // device => base
            if(currencyFound2 && prevCurrency !== baseCurrency.current && currency === baseCurrency.current){
                product.unitPrice = Number((product.unitPrice * (1/currencyFound2.rate)).toFixed(2)) 
            }
            if(currencyFound && currencyFound2 && prevCurrency !== baseCurrency.current && currency !== baseCurrency.current){
                const step1 = Number((product.unitPrice * (1/currencyFound2.rate)).toFixed(2))
                const step2 = Number((step1 / (1/currencyFound.rate)).toFixed(2))
                product.unitPrice = step2
            } 
            return product
        })
        const totalTemp = calculateTotal2(productsTemp)
        setProducts(productsTemp)
        setTotalHt(totalTemp)
    }

    const calculateTotal2 = (prod: Product[]) => {
        return prod.reduce((total, product) => total + (( product.quantity && product.unitPrice ? product.quantity * product.unitPrice : 0)), 0);
    };
    const downloadInvoice = async () => {
        if(products.length > 0){
            const data: InvoiceDocumentType = {
                totalHT,
                currency: currencyActive,
                invoiceNumber,
                invoiceDate,
                dueDate,
                client,
                tva,
                discount,
                products,
                notes
            }
            const blob = await pdf(<InvoiceDocument data={data} />).toBlob()
            saveAs(blob, "facture.pdf")
        }
    }
    const handleImageClick = (index:number) => fileInputRef.current[index]?.click();
    
    const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (imageRef.current[index]) {
                    imageRef.current[index]!.src = reader.result as string;
                    imageRef.current[index]!.style.display = 'block'; 
                    setVisibleImages((prev) => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                    });
                    const productsTemp = [...products].map(product => {
                        if(product.id === index){
                            product.image = reader.result as string
                        }
                        return product
                    })
                    setProducts(productsTemp)
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const uploadLogo = () => logoRef.current?.click();

    const handleChangeLogo = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setTitleLogoImage(file.name)
            const reader = new FileReader();
            reader.onload = () => {
                const clientTemp = {...client}
                clientTemp.logo = reader.result as string
                setClient(clientTemp)
            };
            reader.readAsDataURL(file);
        }
    }
    

    
    useEffect(() => {
        if(exchangeRate.data && exchangeRate.data.length > 0){
            setRateCurrency(exchangeRate.data)
            exchangeRate.data.forEach((cur: ExchangeRate) => {
                if(cur.rate === 1) {
                    baseCurrency.current = cur.currency;
                    setCurrencyActive(cur.currency);
                }
            })
        }
    },[exchangeRate.data])
    
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className='flex flex-col justify-center md:flex-row md:items-center gap-2.5' >
                {
                    exchangeRate.data?.map((cur:ExchangeRate , index:number) => 
                        cur.rate !== 1 && (
                            <Button key={index} variant="default" >
                                <span className={`fi fi-${ cur.currency.slice(0,2).toLowerCase()  }`}></span>{ ' ' }
                                <span className='font-black'> {cur.currency} : {(1/cur.rate).toFixed(2)+' MGA '}</span>
                            </Button>
                            
                        )
                    ) 
                }
        
            </div>
            <div className="text-foreground bg-muted/100  flex-1 rounded-xl md:min-h-min p-4" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputWithLabel
                            label="Numéro de facture"
                            placeholder="Numéro de facture"
                            type="text"
                            id="invoice-number"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Calendar29
                                label="Date de création"
                                value={invoiceDate}
                                setValue={(value) => setInvoiceDate(value)}
                            />
                        </div>
                        <div>
                            <Calendar29
                                label="Date d'échéance"
                                value={dueDate}
                                setValue={(value) => setDueDate(value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-foreground bg-muted/100 flex-1 rounded-xl md:min-h-min p-4" >
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground mb-4">
                    Informations du client
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputWithLabel
                            label="Nom du client"
                            placeholder="Nom complet"
                            type="text"
                            id="client-name"
                            value={client.name}
                            onChange={(e) =>
                                setClient({ ...client, name: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <InputWithLabel
                            label="Email"
                            placeholder="email@exemple.com"
                            type="email"
                            id="client-email"
                            value={client.email}
                            onChange={(e) =>
                                setClient({ ...client, email: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputWithLabel
                            label="Société1"
                            placeholder="Nom de la société"
                            type="text"
                            id="client-company"
                            value={client.company}
                            onChange={(e) =>
                                setClient({ ...client, company: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <InputWithLabel
                            label="Téléphone1"
                            placeholder="030 00 000 00"
                            type="text"
                            id="client-phone"
                            value={client.phone}
                            onChange={(e) =>
                                setClient({ ...client, phone: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <Label>Logo</Label>
                        <Button  variant={"outline"} className="w-1/1  mt-4" onClick={() => uploadLogo()} >
                            {
                                titleLogoImage || "Importer le logo du client"
                            }
                        </Button>
                        <input type="file" ref={logoRef} className="hidden" onChange={handleChangeLogo} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <div>
                        <TextareaWithLabel
                            id="client-address"
                            label="Adresse"
                            placeholder="adresse complete du client"
                            value={client.address}
                            onChange={(e) => setClient({ ...client, address: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="text-foreground bg-muted/100 flex-1 rounded-xl md:min-h-min p-4" >
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground mb-4">
                    Produits et services
                </h4>
                <div className="flex flex-col sm:items-center  sm:flex-row gap-4" >
                    <Button onClick={addProduct}>
                        <CirclePlus /> Ajouter un produit ou un service
                    </Button>
                    
                    
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        {/* <label htmlFor="devise"  >Devise: </label> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">{currencyActive}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Devise appliquée</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={currencyActive} onValueChange={(e) => changeCurrency(e)}>
                                    {rateCurrency.map((item, index) => (
                                        <DropdownMenuRadioItem key={index} value={item.currency}>
                                            {item.currency}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Separator orientation="vertical" />
                        <div className="flex items-center gap-2">
                            <label htmlFor="tva"  >TVA: </label>
                            <Input
                                id="tva"
                                placeholder="TVA"
                                type="number"
                                value={tva}
                                onChange={(e) => setTva(parseFloat(e.target.value))}
                                className="w-16"
                            />
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex items-center gap-2">
                            <label htmlFor="discount"  >Remise: </label>
                            <Input
                                id="discount"
                                placeholder="Remise"
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                                className="w-16"
                            />
                        </div>
                    </div>
                </div>
                <Table className="table-fixed" >
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[500px]" >Description</TableHead>
                            <TableHead className="w-[200px]">Quantité</TableHead>
                            <TableHead className="w-[200px]">
                                Prix unitaire&nbsp;
                                <small className="text-xs text-muted-foreground leading-none font-medium">({currencyActive})</small>
                            </TableHead>
                            <TableHead className="w-[200px] max-w-[200px] truncate" >Total</TableHead>
                            {/* <TableHead ></TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            products.map((product) => (
                                <Fragment key={product.id} >
                                    <TableRow className="border-0 " >
                                        <TableCell colSpan={5} className="text-center"  >
                                            
                                            <input 
                                                type="file" 
                                                className="hidden " 
                                                ref={(elt) => { fileInputRef.current[product.id] = elt } }
                                                onChange={(event) => handleFileChange(product.id, event)}
                                            />
                                            <img className={ `w-1/1 ${visibleImages[product.id] ? "border-2" : ""}` } ref={(elt) => { imageRef.current[product.id] = elt } } onClick={() => handleImageClick(product.id) } />
                                            {
                                                !visibleImages[product.id] && (
                                                    <Button  variant={"outline"} className="w-1/1  " onClick={() => handleImageClick(product.id)} >
                                                        Importer une image du produit
                                                    </Button>
                                                )
                                            }

                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className="font-medium">
                                            <Input 
                                                type="text" 
                                                value={product.description} 
                                                onChange={(e) => updateProduct(product.id,"description",e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input 
                                                type="number" 
                                                value={product.quantity} 
                                                onChange={(e) =>
                                                    updateProduct(
                                                        product.id,
                                                        "quantity",
                                                        parseFloat(e.target.value),
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input 
                                                type="number" 
                                                value={product.unitPrice} 
                                                onChange={(e) =>
                                                    updateProduct(
                                                        product.id,
                                                        "unitPrice",
                                                        parseFloat(e.target.value),
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="flex items-center justify-between " >
                                            {
                                                (product.quantity && product.unitPrice) ?
                                                formatAmountWithDecimal((product.quantity * product.unitPrice).toFixed(2)) :
                                                "0.00"
                                            } { currencyActive}&nbsp;
                                            
                                            <Button onClick={() => removeProduct(product.id)} variant={"destructive"} ><Trash2 /></Button>
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className="flex justify-end mt-4 ">
                    <Card className="flex justify-end mt-4 w-100">
                        
                        <CardContent>
                            <div className="flex justify-between py-2 text-sm">
                                <span className="font-medium">Total HT:</span>
                                <span>{formatAmountWithDecimal(totalHT.toFixed(2))} {currencyActive}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm">
                                <span className="font-medium">TVA ({tva ? tva : 0}%):</span>
                                <span>{tva ? formatAmountWithDecimal((totalHT * (tva/100)).toFixed(2)) : 0} {currencyActive}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm">
                                <span className="font-medium">Remise ({discount ? discount : 0}%):</span>
                                <span>{discount ? formatAmountWithDecimal((totalHT * (discount/100)).toFixed(2)) : 0} {currencyActive}</span>
                            </div>
                            
                            <div className="flex justify-between py-2 text-lg font-bold border-t">
                                <span>Total TTC:</span>
                                <span>{formatAmountWithDecimal((totalHT*(1+ ( tva ? tva/100 : 0 ) - ( discount ? discount/100 : 0) )  ).toFixed(2))} {currencyActive}</span>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <div>
                        <TextareaWithLabel
                            id="note-invoice"
                            label="Notes"
                            placeholder="Ajoutez des notes ou des conditions de paiement..."
                            value={notes}
                            onChange={(e) => setNotes( e.target.value )}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={addProduct}>
                        <CirclePlus /> Ajouter un produit ou un service
                    </Button>
                    <Button onClick={downloadInvoice} variant="outline"  >
                        <Download />
                        Exporter en PDF
                    </Button>
                    <Button variant="secondary" >
                        <Send />
                        Envoyer par email
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Invoice