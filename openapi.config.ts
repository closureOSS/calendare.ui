import { GeneratorConfig } from 'ng-openapi';
import { HttpResourcePlugin } from '@ng-openapi/http-resource';

export default {
  input: '../calendare/openapi.json',
  output: './projects/admin/src/api',
  clientName: 'CalendareApi',
  plugins: [HttpResourcePlugin],
  options: {
    dateType: 'Date',
    enumStyle: 'enum'
  }
} as GeneratorConfig;
