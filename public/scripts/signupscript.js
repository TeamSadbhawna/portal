function validateSignUp(e){return v1=document.getElementById("fullname"),v2=document.getElementById("number"),v3=document.getElementById("email"),v4=document.getElementById("password"),v5=document.getElementById("cnfpassword"),flag1=!0,flag2=!0,flag3=!0,flag4=!0,flag5=!0,(e>=1||0==e)&&(""==v1.value?(v1.style.borderColor="red",flag1=!1):(v1.style.borderColor="green",flag1=!0)),(e>=2||0==e)&&(""==v2.value?(v2.style.borderColor="red",flag2=!1):(v2.style.borderColor="green",flag2=!0)),(e>=3||0==e)&&(""==v3.value?(v3.style.borderColor="red",flag3=!1):(v3.style.borderColor="green",flag3=!0)),(e>=4||0==e)&&(""==v4.value?(v4.style.borderColor="red",flag4=!1):(v4.style.borderColor="green",flag4=!0)),(e>=5||0==e)&&(""==v5.value?(v5.style.borderColor="red",flag5=!1):(v5.style.borderColor="green",flag5=!0)),flag=flag1&&flag2&&flag3&&flag4&&flag5}
