// export default function formatAddress(address:Address){
//     const {geo,...rest} = address;
//     return join(values(rest), ', ');
// }


export const checkValue = (value:number) =>{
    if(value<0){
        return 'Negative value!'
    }

    if(value>0 && value <=0.9){
        return 'Value is not 10!!'
    }
    if(value>0.9 && value <10){
        return 'Value is still not 10!!'
    }

    return 'Value is greater than 10'
}