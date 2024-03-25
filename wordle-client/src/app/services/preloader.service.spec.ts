import { PreloaderService } from "./preloader.service";
import { TestBed } from "@angular/core/testing";

describe("PreloaderService", () => {

  let service: PreloaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PreloaderService
      ]
    });
    service = TestBed.get(PreloaderService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
