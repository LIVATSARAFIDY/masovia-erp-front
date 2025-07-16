import { Button } from "@/components/ui/button"
import { getDefaultCurrencies } from "@/service/invoieService"
import { useQuery } from "@tanstack/react-query"

import "/node_modules/flag-icons/css/flag-icons.min.css";

const Invoice = () => {
    const exchangeRate = useQuery({
        queryKey: ['exchangeRate'], 
        queryFn: async () => {
            const res = await getDefaultCurrencies()
            return res
        },
    })
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance" >
                Créer une nouvelle facture
            </h1>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
                test
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" >test</div>
                <div className="bg-muted/50 aspect-video rounded-xl" >test2</div>
                <div className="bg-muted/50 aspect-video rounded-xl" >test3</div>
            </div>
        </div>
    )
}

export default Invoice