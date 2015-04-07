function UploadFileView(config){
	GenericView.call(this,config);
}

UploadFileView.prototype.constructor = UploadFileView;

inheritPrototype(UploadFileView,GenericView);

UploadFileView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
    this.path = "views/uploadFileView.html";
}

UploadFileView.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-upload-file").click({ context:this }, this.onClickUploadFile );
    $(this.node).find('#input-file-name').change({ context:this }, function(e){
        $(e.data.context.node).find("#file-path").val($(this).prop('files')[0].name);
    });
}	

UploadFileView.prototype.onClickUploadFile = function(e){
    var self = e.data.context;
	self.fileId = 0;
    self.overwrittenFileName = '';
    var fileData = $(self.node).find('#input-file-name').prop('files')[0];
    
    if($(self.node).find('#input-file-name').prop('files').length == 0){
        return false;
    }
    
    Monkeyman.isLoading();

    if(self.checkExtensionFile(fileData.name)) {
        var fileDate = (fileData.name).split("_")[1];
        var fileInformation = self.checkFileInCurrentDay(fileDate);
        if(fileInformation.length == 0){
            self.uploadFile();
        }else{
            self.fileId = parseInt(fileInformation[0].fileId);
            debugger;
            self.overwrittenFileName = fileInformation[0].fileName;
            self.getPopupOverwriteData();
        }
    } else {
        alert("La extension debe ser .xls");
       self.resetForm();
        return false;
    }
}

UploadFileView.prototype.checkExtensionFile = function(fileName){
    return (fileName.split(".")[fileName.split(".").length-1] == "xls") ? true : false;
}

/** 
*   Chequeo si existe informacion del mismo dia
*/
UploadFileView.prototype.checkFileInCurrentDay = function(fileDate){
    var fileInformation;
    $.ajax({
        url : "service/manager/checkFileInCurrentDay.php",
        async : false,
        type : "POST",
        data : { fileDate : fileDate },
        success : function(r){
            fileInformation = JSON.parse(r);
        },
        error : function(error){
            alert(error);
        }
    });
    return fileInformation;
}

UploadFileView.prototype.getPopupOverwriteData = function(){
    Monkeyman.stopLoading();
    Monkeyman.getOverlay();
    var popupOverwriteData = new AlertMessage({ container:$("body"), message: "Ya se subió un archivo con esta fecha. Desea sobreescribir la información?" }); 
    $(popupOverwriteData).bind( Globals.ON_ALERT_MESSAGE_HANDLER, { context:this } ,this.onAlertMessageHandler, false );
}

UploadFileView.prototype.onAlertMessageHandler = function(e){
    e.stopPropagation();
    if(e.value == 1){
        // overwrite data
        Monkeyman.isLoading();
        e.data.context.removeFile(e.data.context.overwrittenFileName);
    }else{
        // cancel overwrite data
        e.data.context.resetForm();
    }
    Monkeyman.removeOverlay();
    e.currentTarget.destroy();
}

UploadFileView.prototype.removeFile = function(fileName){
    $.ajax({
        context : this,
        url : 'service/manager/removeFile.php',
        async : false,
        type : 'POST',
        data : { fileName : fileName },
        success : function(r){
            debugger;
            this.removeDataById(this.fileId);
        },
        error : function(error){
            debugger;
        }
    })
}

UploadFileView.prototype.removeDataById = function(fileId){
    $.ajax({
        context : this,
        url : 'service/manager/removeDataById.php',
        type : 'POST',
        data : { fileId : fileId },
        success : function(r){
            debugger;
            this.uploadFile();
        },
        error : function(error){
            alert(error);
        }
    });
}

UploadFileView.prototype.uploadFile = function(){
    var fileData = $(this.node).find('#input-file-name').prop('files')[0];
    var formData = new FormData();                  
    formData.append('file', fileData);
    $.ajax({
        context : this,
        url: 'service/uploadFile.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,                         
        type: 'post',
        success: function(r){
            if(r != "") {
               this.insertUploadedFileInformation({ fileName : r, creationFile : r.split("_")[1] });
            } else {
                alert("Ocurrio un error al subir el archivo");
            }
        },
        error:function(error){
            alert(error);
        }
    });
}

UploadFileView.prototype.insertUploadedFileInformation = function(d){
    $.ajax({
        context : this,
        async : false,
        type : "POST",
        data : d,
        url : "service/manager/insertUploadedFileInformation.php",
        success : function(r){
            debugger;
            var result = JSON.parse(r);
            this.fileId = result.fileId;
            this.getExcelData(result.fileName);
        },
        error : function(error){
            alert(error);
        }
    });
}

UploadFileView.prototype.getExcelData = function(fileName){
    $.ajax({
        context : this,
        url : "service/manager/PHPExcel/excelReader.php",
        async : false,
        type : "POST",
        data : { fileName : fileName },
        success : function(r){
            debugger;
            this.parseTrxsData(JSON.parse(r))
        },
        error : function(error){
           alert(error);
        }
    })   
}

/*
*/

UploadFileView.prototype.parseTrxsData = function(d) {
    var data = [];
    for (i in d) {
        data.push(d[i]);
    }
    
    data.forEach(function(_data,_index){
        // Los primeros 3 objetos corresponden a titulos del excel
        if(_index >= 3){
            this.insertTrx(_data);
        }
    },this);
}

// Subo la informacion de cada transaccion
UploadFileView.prototype.insertTrx = function(data){
    debugger;
    $.ajax({
        context : this,
        async : false,
        type : "POST",
        data : {
            idArchivo : this.fileId,
            fecha : data.A,
            idCliente : data.B,
            cliente : data.C,
            idUsuario : data.D,
            usuario : data.E,
            idProducto : data.F,
            producto : data.G,
            carTel : data.H,
            importe : data.I.slice(1).replace(',','.'),
            cantTrxs : data.J,
            trxProm : data.K.slice(1).replace(',','.'),
            idTerminal : data.L,
            terminal : data.M,
            modeloDeTerminal : data.N,
            tipoTrx : data.O,
            estado : data.P,
            idLote : data.Q,
            identifTerminal : data.R
        },
        url : "service/manager/insertTrx.php",
        success : function(r){
           this.resetForm();
        },
        error : function(error){
            alert(error);
        }
    });
}

UploadFileView.prototype.resetForm = function(){
    $(this.node).find('#input-file-name').val("");
    $(this.node).find("#file-path").val("");
    Monkeyman.stopLoading()
}

 

