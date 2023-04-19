class DataSource {
    async putData(list) {
        await this.sleep(500);
        localStorage.setItem('todoItems', JSON.stringify(list));
    };

    async getData() {
        await this.sleep(1000);
        return localStorage.getItem('todoItems')
    };

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

}

export default DataSource;