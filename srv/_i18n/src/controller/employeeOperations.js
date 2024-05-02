const onBeforeEmployeeCreate = async (req) => {
    const { DOB } = req.data;
    const iAge = _getAge(DOB);
    req.data.age = iAge;
  };
  
  const onAfterEmployeeCreate = async (req) => {
    req.forEach(element => {
      element.fName = `Mr. ${element.fName}`;
    });
  };
  
  const _getAge = (sDate) => {
    const oToday = new Date(),
      oBirthDate = new Date(sDate);
    const age = oToday.getFullYear() - oBirthDate.getFullYear();
    return age;
  };
  
  module.exports = {
    onBeforeEmployeeCreate,
    onAfterEmployeeCreate,
  };
  