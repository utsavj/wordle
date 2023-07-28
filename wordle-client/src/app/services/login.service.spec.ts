import { LoginService } from "./login.service";
import { TestBed } from "@angular/core/testing";

describe("LoginService", () => {

  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService
      ]
    });
    service = TestBed.get(LoginService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
