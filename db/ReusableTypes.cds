namespace reusable.types;


type Amount      : Decimal(10, 2);
// abc@xyz.com
type Email       : String @assert.format: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
type PhoneNumber : String @assert.format: '^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$';

aspect PersonDetails {
    fName : String;
    lName : String;
}
