import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    constructor() { }

    downloadFile(type: string, data: any[], filename: string = 'data') {
        const headers = this.generateHeaders(data);
        let blob: Blob;
        switch (type) {
            case 'csv':
                const csvData = this.prepareCsvFile(data, headers);
                blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
                break;
            default:
                break;
        }

        const dwldLink = document.createElement('a');
        const url = URL.createObjectURL(blob);
        dwldLink.setAttribute('href', url);
        dwldLink.setAttribute('download', filename + '.' + type);
        dwldLink.style.visibility = 'hidden';
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    private prepareCsvFile(data, headers) {
        const parsedData = typeof data !== 'object' ? JSON.parse(data) : data;
        let str = '';
        let row = 'No.,';

        for (const header of headers) {
            row += header + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < parsedData.length; i++) {
            let line = (i + 1) + '';
            for (const header of headers) {
                const lineText = parsedData[i][header] ? parsedData[i][header] : '';
                line += ',' + lineText;
            }
            str += line + '\r\n';
        }
        return str;
    }

    private generateHeaders(data: any[]): string[] {
        return Object.keys(Object.assign({}, ...data));
    }
}
