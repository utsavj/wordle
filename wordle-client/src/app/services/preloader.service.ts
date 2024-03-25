import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { PreloaderComponent } from "../components/preloader/preloader.component";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class PreloaderService {

  public showPreloaderCount = 0;
  public overlayRef!: OverlayRef;

  constructor(
    public overlay: Overlay
  ) {

  }

  public show(){
    this.showPreloaderCount++;

    if (this.showPreloaderCount > 0){
      this.overlayRef = this.overlay.create({
        height: '100%',
        width: '100%',
        hasBackdrop: true
      });
      const preloaderPortal = new ComponentPortal(PreloaderComponent);
      this.overlayRef.attach(preloaderPortal);
    }
  }

  public hide(){
    this.showPreloaderCount--;
    if(this.showPreloaderCount == 0){
      this.overlayRef.dispose();
    }
  }
}
