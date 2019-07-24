import { ICache } from "./cache.service";

export class LocalStorageCache implements ICache {
  private buildCacheKeyRoot(mode: ICache.Mode) {
    return `${mode}`;
  }

  private buildCacheKey(mode: ICache.Mode, key: string) {
    return `${this.buildCacheKeyRoot(mode)}+${key}`;
  }


  private getKeys(mode: ICache.Mode): string[] {
    let root = this.buildCacheKeyRoot(mode);
    return Object.keys(localStorage).filter(k => k.startsWith(`${root}+`))
  }

  clear(mode?: ICache.Mode) {
    if (!mode) {
      return Object.keys(localStorage)
        .filter(k => !k.startsWith(`${ICache.Mode.Permanent}+`))
        .forEach(k => localStorage.removeItem(k))
    }

    this.getKeys(mode).forEach(k => 
        localStorage.removeItem(this.buildCacheKey(mode, k)));
  }

  set(mode: ICache.Mode, key: string, value: any) {
    if (value == null) return;

    localStorage.setItem(this.buildCacheKey(mode, key), JSON.stringify(value));
  }

  get(mode: ICache.Mode, key: string): object {
    let asJson = localStorage.getItem(this.buildCacheKey(mode, key));
    
    try {
      return JSON.parse(asJson)
    } catch (error) {
      return null;
    }
  }

  delete(mode: ICache.Mode, key: string) {
    localStorage.removeItem(this.buildCacheKey(mode, key));
  }
}
