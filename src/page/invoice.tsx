
import { useState, useEffect, type FunctionComponent } from 'react';
import { useQuery } from '@tanstack/react-query'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { getDefaultCurrencies } from '../service/invoieService';
import { Button } from "@/components/ui/button"
import type { ExchangeRate } from '@/type';

interface Product {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface Client {
  name: string;
  email: string;
  address: string;
  phone: string;
  company: string;
}

const Invoice: FunctionComponent = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [client, setClient] = useState<Client>({
    name: '',
    email: '',
    address: '',
    phone: '',
    company: ''
  });
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [currencies, setCurrencies] = useState<ExchangeRate[]>([]);

  const exchangeRate = useQuery({
    queryKey: ['exchangeRate'], 
    queryFn: async () => {
      const res = await getDefaultCurrencies()
      return res
    },
  })

  useEffect(() => {
    const today = new Date();
    setInvoiceDate(today.toISOString().split('T')[0]);
    
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 30);
    setDueDate(dueDate.toISOString().split('T')[0]);
    
    setInvoiceNumber(`INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);

    if(exchangeRate.data && exchangeRate.data.length > 0) {
      setCurrencies(exchangeRate.data);
    }
  }, []);

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, [field]: value };
      }
      return product;
    }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + (product.quantity * product.price), 0);
  };

  const handleExportPDF = () => {
    // Implement PDF export functionality
    console.log('Exporting PDF...');
  };

  const handleSendEmail = () => {
    setShowEmailModal(true);
  };

  const handleEmailSubmit = () => {
    setEmailStatus('sending');
    // Implement email sending functionality
    setTimeout(() => {
      setEmailStatus('sent');
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailStatus('');
      }, 2000);
    }, 1500);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          
          <div className='flex flex-col justify-center md:flex-row md:items-center gap-2.5' >
          {
              exchangeRate.data?.map((cur:any , index:number) => (
              <Button key={index} variant="default" >
                <span className={`fi fi-${ cur.targetCurrency.code.slice(0,2).toLowerCase()  }`}></span>{ ' ' }
                <span className='font-black' >{cur.targetCurrency.code} :</span> {(1/cur.rate).toFixed(3)+' MGA '} 
              </Button>
              )) 
          }
          
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Créer une nouvelle facture
          </h1>

          {/* Invoice Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de facture
                  </label>
                  <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de facture
                    </label>
                    <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date d'échéance
                    </label>
                    <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
                </div>
            </div>

          {/* Client Information */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations du client
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du client
                    </label>
                    <input
                    type="text"
                    value={client.name}
                    onChange={(e) =>
                        setClient({ ...client, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Nom complet"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                    </label>
                    <input
                    type="email"
                    value={client.email}
                    onChange={(e) =>
                        setClient({ ...client, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="email@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Société
                    </label>
                    <input
                    type="text"
                    value={client.company}
                    onChange={(e) =>
                        setClient({ ...client, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Nom de la société"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                    </label>
                    <input
                    type="tel"
                    value={client.phone}
                    onChange={(e) =>
                        setClient({ ...client, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="+33 1 23 45 67 89"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                    </label>
                    <textarea
                    value={client.address}
                    onChange={(e) =>
                        setClient({ ...client, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                    placeholder="Adresse complète"
                    ></textarea>
                </div>
                </div>
            </div>

            {/* Products List */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                      Produits et services
                  </h2>
                  <button
                      onClick={addProduct}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap flex items-center"
                  >
                      <i className="fas fa-plus mr-2"></i>
                      Ajouter un produit
                  </button>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 w-1/3">
                        Description
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 w-1/6">
                        Quantité
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 w-1/6">
                        Prix unitaire
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 w-1/6">
                        Total
                        </th>
                        <th className="px-4 py-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b">
                        <td className="px-4 py-2">
                            <input
                            type="text"
                            value={product.description}
                            onChange={(e) => updateProduct(product.id,"description",e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Description du produit"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                                updateProduct(
                                product.id,
                                "quantity",
                                parseInt(e.target.value),
                                )
                            }
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            min="1"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                            type="number"
                            value={product.price}
                            onChange={(e) =>
                                updateProduct(
                                product.id,
                                "price",
                                parseFloat(e.target.value),
                                )
                            }
                            className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            min="0"
                            step="0.01"
                            />
                        </td>
                        <td className="px-4 py-2 text-sm">
                            {(product.quantity * product.price).toFixed(2)} €
                        </td>
                        <td className="px-4 py-2">
                            <button
                            onClick={() => removeProduct(product.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            >
                            <i className="fas fa-trash"></i>
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

                <div className="flex justify-end mt-4">
                <div className="w-64">
                    <div className="flex justify-between py-2 text-sm">
                    <span className="font-medium">Total HT:</span>
                    <span>{calculateTotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm">
                    <span className="font-medium">TVA (20%):</span>
                    <span>{(calculateTotal() * 0.2).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold border-t">
                    <span>Total TTC:</span>
                    <span>{(calculateTotal() * 1.2).toFixed(2)} €</span>
                    </div>
                </div>
                </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={4}
                    placeholder="Ajoutez des notes ou des conditions de paiement..."
                ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    onClick={handleExportPDF}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors !rounded-button whitespace-nowrap flex items-center"
                >
                <i className="fas fa-file-pdf mr-2"></i>
                Exporter en PDF
                </button>
                <button
                    onClick={handleSendEmail}
                    className=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap flex items-center"
                    disabled
                >
                <i className="fas fa-paper-plane mr-2"></i>
                    Envoyer par email
                </button>
            </div>
        </div>
      </div>
  )
}

export default Invoice