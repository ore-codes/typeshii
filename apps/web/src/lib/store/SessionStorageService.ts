import { BehaviorSubject } from 'rxjs';

export class SessionStorageService<T> {
  private subject: BehaviorSubject<T | null>;

  constructor(private key: string) {
    const storedValue = this.getStoredValue();
    this.subject = new BehaviorSubject<T | null>(storedValue);
  }

  private getStoredValue(): T | null {
    const value = sessionStorage.getItem(this.key);
    return value ? (JSON.parse(value) as T) : null;
  }

  get data$() {
    return this.subject.asObservable();
  }

  setData(value: T) {
    sessionStorage.setItem(this.key, JSON.stringify(value));
    this.subject.next(value);
  }

  clear() {
    sessionStorage.removeItem(this.key);
    this.subject.next(null);
  }
}
