export type Language = 'vi' | 'en' | 'ja';

export type DeepStringObject<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? DeepStringObject<T[K]>
    : string;
};

export type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];
