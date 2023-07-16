import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WordleGridComponent } from "./wordle-grid.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("WordleGridComponent", () => {

  let fixture: ComponentFixture<WordleGridComponent>;
  let component: WordleGridComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [WordleGridComponent]
    });

    fixture = TestBed.createComponent(WordleGridComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
