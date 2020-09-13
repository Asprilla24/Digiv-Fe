
import { SOBAT_1 ,SOBAT_2 ,SOBAT_3 ,SOBAT1_HONDA ,SOBAT1_TOYOTA ,ALL_BOOTH} from "@constants/translaterVideo";

 const  translaterVista = (type, msg) => {
    const boothFInd = ALL_BOOTH.find(booth => booth.name == msg )
    console.log(boothFInd)
    if(!boothFInd){
        return null
    }else {
        return boothFInd.path
    }
};


export default translaterVista