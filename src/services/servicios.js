import axios from 'axios'

class Services{
    getArchivos(){
        return axios.get(`/archivos/`);
    }
    getArchivo(){
        return axios.get(`/archivos/download/csv/`);
    }
    logout(){
        return axios.get(`/user/logout/`);
    }
    upArchivos( formData ){
        return axios.patch(`/archivos/update/csv/`, formData );
    }
    upImagen( formData, id ){
        return axios.patch(`/pueblos/${id}/`, formData );
    }

    addPueblo(payload) {
        return axios.post('/pueblos/', payload);
    }

    deletePueblo(idPueblo) {
        console.log('idPueblo', idPueblo);
        return axios.delete(`/pueblos/${idPueblo}/`)
    }
}

export default new Services();
