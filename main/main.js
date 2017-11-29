'use strict'
const loadallitems=require("./datbase.js").loadAllItems();
const loadpromotions=require("./datbase.js").loadPromotions();

function getmessage(input){
    let arr=[];
    let arr1=[];
    let temp=[];
    let list=[];
    for(let i=0;i<input.length;i++){
        if(input[i].length>10){
        arr=input[i].split('-');
        input[i]=arr[0];
        arr1.push(arr[0]);
        temp.push(parseInt(arr[1]));
        }
    }
    for(let i=0;i<input.length;){
        let count=0;
        for(let j=i;j<input.length;j++){
            if(input[i]===input[j])
            count++;
        }
        list.push({
        barcode:input[i],
        num:count
    })
        i+=count;
    }
    for(let i=0;i<list.length;i++){
        for(let j=0;j<temp.length;j++)
        if(list[i].barcode===arr1[j]){
        list[i].num=temp[j];
        }
    }
    // console.log(list);
    return list;

}

function statistics(arr){
    for(let i=0;i<loadallitems.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[j].barcode===loadallitems[i].barcode){
                arr[j].name=loadallitems[i].name;
                arr[j].unit=loadallitems[i].unit;
                arr[j].price=loadallitems[i].price;
                arr[j].sum=arr[j].num*loadallitems[i].price;
            }
        }
    }
    arr.push({});
    let temp=arr.length-1;
    let a=0,b=0,c=0,d=0;
    arr[temp].name=new Array();
    arr[temp].num=new Array();
    arr[temp].unit=new Array();
    arr[temp].price=new Array();
    arr[temp].sum=new Array();
    for(let i=0;i<loadpromotions[0].barcodes.length;i++){
        for(let j=0;j<arr.length-1;j++){
            if(arr[j].barcode===loadpromotions[0].barcodes[i]){
                arr[temp].name[a++]=arr[j].name;
                arr[temp].num[b++]=arr[j].num;
                arr[temp].unit[c++]=arr[j].unit;
                arr[temp].price[d++]=arr[j].price;
                arr[j].sum=arr[j].sum-arr[temp].price[d-1];
            }
        }
    }
    for(let i=0;i<arr[temp].num.length;i++){
        if(arr[temp].num[i]>2)
        arr[temp].num[i]=1;
    }
    for(let i=0;i<arr[temp].name.length;i++){
        arr[temp].sum[i]=arr[temp].num[i]*arr[temp].price[i];
    }
    // console.log(arr);
    return arr;

}

function allsum(arr){
    let sum=0;
    for(let i=0;i<arr.length-1;i++){
        sum+=arr[i].sum;
    }
    // console.log(sum);
    return sum;
}

function savesum(arr){
    let sum1=0;
    let temp=arr.length-1;
    for(let i=0;i<arr[temp].sum.length;i++){
        sum1+=arr[temp].sum[i];
    }
    // console.log(sum1);
    return sum1;
}

function printInventory(inputs)
{
    let list=getmessage(inputs);
    let arr=statistics(list);
    let temp=arr.length-1;
    let text='***<没钱赚商店>购物清单***\n' ;
    for(let i=0;i<arr.length-1;i++){
        text=text+'名称：'+arr[i].name+'，数量：'+arr[i].num.toString()+arr[i].unit+'，单价：'+arr[i].price.toFixed(2).toString()+'(元)，小计：'+arr[i].sum.toFixed(2).toString()+'(元)\n';
        // console.log(arr[i].name);
    }
    text=text+'----------------------\n';
    text=text+'挥泪赠送商品：\n';
    for(let j=0;j<arr[temp].name.length;j++)
    {
        text=text+'名称：'+arr[temp].name[j]+'，数量：'+arr[temp].num[j].toString()+arr[temp].unit[j]+'\n';
    }
    text=text+'----------------------\n';
    text=text+'总计：'+allsum(arr).toFixed(2).toString()+'(元)\n'+'节省：'+savesum(arr).toFixed(2).toString()+'(元)\n'+'**********************';
    console.log(text);
}


printInventory([
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
]);

module.exports=printInventory;