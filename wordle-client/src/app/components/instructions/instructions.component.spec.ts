import { NO_ERRORS_SCHEMA } from "@angular/core";
import { InstructionsComponent } from "./instructions.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("InstructionsComponent", () => {

  let fixture: ComponentFixture<InstructionsComponent>;
  let component: InstructionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [InstructionsComponent]
    });

    fixture = TestBed.createComponent(InstructionsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
