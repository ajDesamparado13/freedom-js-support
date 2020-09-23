const file = {
    sizes:{
        kb:1000,
        mb:1000000,
    },
    isAudio(file){
        let exts = ['mp3','ogg','m4a','wav','3gp','aa','aac','m4b','m4p','mpc','wma'];
        let types = [];
        return types.includes(file.type) || exts.includes(file.name.split('.').pop());
    },
    isExcel(file){
        let exts = [ 'xlsx','xlsv','xlsx'];
        let types = [ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        return types.includes(file.type) || exts.includes(file.name.split('.').pop());
    },
    isCsv(file){
        let types = ['text/csv']
        let exts = ['csv']
        return types.includes(file.type) || exts.includes(file.name.split('.').pop());
    },
    isImage(file){
        let types = [];
        let exts = ['jpg','jpe','jpeg','png','bmp','gif'];
        return file.type.indexOf('image')>=0 || types.includes(file.type) || exts.includes(file.name.split('.').pop());
    },
    isPDF(file){
        let types = [];
        let exts = ['pdf'];
        return file.type.indexOf('pdf')>=0 || types.includes(file.type) || exts.includes(file.name.split('.').pop());
    },
    getSize(file,read="mb"){
        var multiplier = this.sizes[read];
        if(typeof file == 'File'){
            return file.size / multiplier;
        }
        return file / multiplier;
    },
    getExtension(file){
        return file.name.split('.').pop();
    },
    getType(file){
        var ext =  this.getExtension(file);
        var mime  =  file.type;

        switch(ext){
            case 'csv':
            case 'png':
            case 'jpg':
            case 'pdf':
                return ext;
                break;
            case 'xls':
            case 'xlsx':
            case 'xlsv':
                return 'excel'
        }
        return mime;
    },
    upload(event){

        var list = event.list ? event.list : [];
        var handler = event.handler
        var validator = event.validator
        var updater = event.updater
        var objectify = event.objectify ? event.objectify : false;
        var params = event.params ? event.params : '';

        return new Promise((resolve,reject)=>{
            var errors = 0, invalid = 0,success = 0, message={ success:'', error:'', invalid:''};
            var inc = 100/list.length, current_progress = 0, target_progress = 0;
            var interval;

            var update_handler = (progress) => {
                if(progress > current_progress){
                    current_progress = progress;
                }
                if(typeof updater == 'function'){
                    updater(Math.floor(progress));
                }
            }

            var resolve_handler = (res_message,type="success")=>{
                if(res_message){
                    message[type] += res_message + "\r\n"
                }
                target_progress += inc;
                if(target_progress < 99){
                    update_handler(target_progress);
                }

                if(target_progress >= 99.9 || current_progress >= 99.9){
                    update_handler(100);
                    clearInterval(interval);
                    if(!objectify){
                        var n_message = "";
                        for(let i in message){
                            n_message += message[i];
                        }
                        message = n_message;
                    }
                    resolve({ errors,invalid,success,message });
                }
            }

            interval = setInterval(()=>{
                if(current_progress < Math.ceil(inc) && current_progress < 99){
                    update_handler(current_progress+1);
                }
                if(current_progress>=100){
                    target_progress = 100;
                    resolve_handler();
                }
            },1000);

            for(let i in list){

                var file = list[i];
                if(!file.name || typeof file == 'function')continue;
                var valid = true;

                if(typeof validator == 'function'){
                    valid = validator(file);
                }


                if(!valid){
                    invalid+=1;
                    resolve_handler();
                    continue
                }else{
                    var result = handler({file,params})
                    result.then((response)=>{
                        success++;
                        resolve_handler(response.message,'success');
                    },(response)=>{
                        errors++;
                        resolve_handler(response.message,'error');
                    })
                }
            }
        });
    },
    download(res,file_name=""){
        var blob = res;
        if(res && typeof res.blob == 'function' ){
            res.blob().then(n_blob=>{
                this.load_file(n_blob,file_name);
            })
        }else{
            this.load_file(blob,file_name);
        }
    },
    load_file(blob,file_name){
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveOrOpenBlob(blob,file_name);
        }else{
            //var blob = new Blob([new Uint8Array(byteArray)],{type:'text/csv;charset=UTF-16LE'});
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = file_name;
            document.body.appendChild(link);
            link.target="_self";
            link.style.display='none';
            link.click();
            document.body.removeChild(link);
        }
    },
}

export const VUE_INSTALLER = (Vue)=>{
    if(Vue._file){
        return;
    }

    Vue._file = file

    Object.defineProperties(Vue.prototype,{
        $_file:{
            get:() => {
                return Vue._file;
            }
        }
    })
}
export default file
