import { TestBed } from '@angular/core/testing';
import { AcceptService } from './accept.service';

describe('AcceptService', () => {
  let service: AcceptService;

  /** Returns a simple fake file with given extension and optional type. */
  const getFile = (ext: string, type?: string) => new File(['...'], `${Date.now()}.${ext}`, { type });

  const getFileList = () => [
    getFile('doc', 'application/msword'),
    getFile('docx', 'application/msword'),
    getFile('txt'),
    getFile('pdf', 'application/octet-stream')
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptService);
  });

  it('should filter based on file extension', () => {
    const files = getFileList();
    const accepted = service.accepts(files, '.doc, txt , .pdf,random/MIME');
    expect(accepted).toBeFalse();
  });

  it('should filter based on MIME type', () => {
    const files = getFileList();
    const accepted = service.accepts(files, 'application/msword, application, random/MIME');
    expect(accepted).toBeFalse();
  });

  it('should filter based on generic MIME type', () => {
    const files = getFileList();
    const accepted = service.accepts(files, 'application/msexcel, application/*, random/MIME');
    expect(accepted).toBeFalse();
  });

  it('should filter based on mixed extension and MIME type', () => {
    const files = getFileList();
    const accepted = service.accepts(files, '.txt, application/msword , random/MIME');
    expect(accepted).toBeFalse();
  });

  it('should skip filter on wildcard', () => {
    const files = getFileList();
    const accepted = service.accepts(files, '*');
    expect(accepted).toBeTrue();
  });

  it('should filter single file', () => {
    const file = getFile('txt', 'text/plain');
    const accepted = service.accepts(file, 'text/plain');
    expect(accepted).toBeTrue();
  });

  it('should not accept null', () => {
    const accepted = service.accepts(null, '*');
    expect(accepted).toBeFalse();
  });
});
