import { Pool, QueryResult } from 'pg';
import { config } from './config';

const pool = new Pool(config.db)

type QueryPromise<T> = Partial<QueryResult<T>> & {
    rows: any[];
    rowCount: number;
}

export const query = async <T>(sql: string, values: any[] = []): Promise<QueryPromise<T>> => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, res) => {
            if (err) {
                reject(err);
            }
            
            resolve({rows: res?.rows || [], rowCount: res?.rowCount || 0});
        })
    })
}

export const updateBuilder = (columns: any, params: any[]) => {
    const values = [];
    const names = [];
    Object.keys(columns).map((key, index) => {
      params.map((item) => {
        if (item[key] !== undefined) {
          values.push(item[key])
          names.push(columns[key]);
        }
      })
    })
  
    
    return { values, names: names.map((item, index) => item.replace('?', `$${index + 1}`)).join(',') }
  }
