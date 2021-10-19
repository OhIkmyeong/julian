const ipt = document.getElementById('ipt');
const btn_add = document.getElementById('btn-add');
const btn_reset = document.getElementById('btn-reset');
const btn_confirm = document.getElementById('btn-confirm');
const area_result = document.getElementById('area-result');
const sel_year = document.querySelectorAll('[name = "sel_year"]');
let DAYS = {
    month : 0,
    day : 0,
    prev : 0
}
const monthDAYS = [31,28,31,30,31,30,31,31,30,31,30,31];
let monthARR = [...monthDAYS];
let char_month = {
    jan:0, feb:0, mar:0, apr:0, may:0,
    jun:0, jul:0, aug:0, sep:0, oct:0, 
    nov:0, dec:0
}

function make_ipt(){
    const new_input = document.createElement('INPUT');
    new_input.type = "number";
    ipt.appendChild(new_input);
}//make_ipt

function cacul_ipt(){
    area_result.innerHTML = '';

    check_year();
    
    const vals = ipt.getElementsByTagName('INPUT');
    for(let val of vals){
        to_normal_day(eval(val.value));
    }
}//cacul_ipt

function check_year(){
    const year = sel_year[1].checked ? 'regular' : 'leap';

    if(year == "leap"){
        monthARR[1] = 29;
    }else{
        monthARR = [...monthDAYS];
    }

    let NUM = 0;
    for(let key in char_month){
        char_month[key] = val_month_julian(NUM + 1);
        NUM++;
    }
}//check_year

function val_month_julian(month){
    DAYS.prev = 0;
    for(let i = 0; i<month; i++){
        DAYS.prev += monthARR[i];
    }
    return DAYS.prev;
}//val_month_julian

function to_normal_day(val){
    if(!val){return;}

    if(val <= char_month.jan){
        DAYS.month = 1;
    }else if(val <= char_month.feb){
        DAYS.month = 2;
    }else if(val <= char_month.mar){
        DAYS.month = 3;
    }else if(val <= char_month.apr){
        DAYS.month = 4;
    }else if(val <= char_month.may){
        DAYS.month = 5;
    }else if(val <= char_month.jun){
        DAYS.month = 6;
    }else if(val <= char_month.jul){
        DAYS.month = 7;
    }else if(val <= char_month.aug){
        DAYS.month = 8;
    }else if(val <= char_month.sep){
        DAYS.month = 9;
    }else if(val <= char_month.oct){
        DAYS.month = 10;
    }else if(val <= char_month.nov){
        DAYS.month = 11;
    }else if(val <= char_month.dec){
        DAYS.month = 12;
    }

    DAYS.day = val - val_month_julian(DAYS.month - 1);

    make_result(DAYS.month, DAYS.day)
}//to_normal_day


function make_result(month,day){
    const new_input = document.createElement('INPUT');
    new_input.type = 'text';
    new_input.value = `${month}월 ${day}일`;
    new_input.readOnly = true;
    area_result.appendChild(new_input);
}//make_result


function reset_ipt(){
    const curr_ipt = ipt.getElementsByTagName('INPUT');
    for(let val of curr_ipt){
        val.value = "";
    }

}//reset_ipt

/* 실행 */
btn_add.addEventListener('click',make_ipt);
btn_confirm.addEventListener('click', cacul_ipt);
btn_reset.addEventListener('click', reset_ipt);

