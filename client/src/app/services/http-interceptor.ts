import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/loader.service';
import { GlobalService } from './global.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService,
    private globalService: GlobalService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
    });
    this.loaderService.show();
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
          switch (event.body.statusCode) {
            case 401:
              this.globalService.deleteUserCredential();
              this.router.navigate(['']);
              break;
            // case 400:
            //   if ('body' in event && 'message' in event['body']) {
            //     this.globalService.errorResponse(event.body.message);
            //   } else {
            //     this.globalService.errorResponse('Bad Request, Please Try Again Later.');
            //   }
            //   break;
            // case 404:
            //   if ('body' in event && 'message' in event['body']) {
            //     this.globalService.errorResponse(event.body.message);
            //   } else {
            //     this.globalService.errorResponse('Not Found, Please Try Again Later.');
            //   }
            //   break;
            // case 500:
            //   if ('body' in event && 'message' in event['body']) {
            //     console.log(event.body.message);
            //   } else {
            //     console.log('Internal Server Error, Please Try Again Later.');
            //   }
            //  break;
          }
        }
      },
        (err) => {
          this.loaderService.hide();
        })
    )
  }
}
