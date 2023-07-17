import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SuccessDialogComponent } from "./success-dialog.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SuccessDialogComponent", () => {

  let fixture: ComponentFixture<SuccessDialogComponent>;
  let component: SuccessDialogComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SuccessDialogComponent]
    });

    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
