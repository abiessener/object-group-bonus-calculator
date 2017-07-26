var atticus = { name: "Atticus", employeeNumber: "2405", annualSalary: "47000", reviewRating: 3 };
var jem = { name: "Jem", employeeNumber: "62347", annualSalary: "63500", reviewRating: 4 };
var boo = { name: "Boo", employeeNumber: "11435", annualSalary: "54000", reviewRating: 3 };
var scout = { name: "Scout", employeeNumber: "6243", annualSalary: "74750", reviewRating: 5 };
var robert = { name: "Robert", employeeNumber: "26835", annualSalary: "66000", reviewRating: 1 };
var mayella = { name: "Mayella", employeeNumber: "89068", annualSalary: "35000", reviewRating: 2 };

var employees = [ atticus, jem, boo, scout, robert, mayella ];

// YOU SHOULD NOT NEED TO CHANGE ANYTHING ABOVE THIS POINT

// constructor for an employee bonus object. Poorly named :/
function Result(name, bonusPercentage, totalBonus, totalCompensation) {
    this.name = name;
    this.bonusPercentage = bonusPercentage;
    this.totalBonus = totalBonus;
    this.totalCompensation = totalCompensation;
}

// takes an employee and returns a NEW object with that employee's bonus data
function bonus(emp){    
    // var result = {};
    // result.name = emp.name;
    // result.bonusPercentage = calcBonus(emp);
    // result.totalBonus = emp.annualSalary * result.bonusPercentage;
    // result.totalCompensation = +result.totalBonus + +emp.annualSalary;
    // return result;

    var name = emp.name;
    var bonusPercentage = calcBonus(emp); // tbd
    var totalBonus = emp.annualSalary * bonusPercentage; // bonus per calc
    var totalCompensation = +totalBonus + +emp.annualSalary; //base + bonus
    
    var result = new Result(name, bonusPercentage, totalBonus, totalCompensation);
    
    return result;
}

// takes an employee, returns the bonus percentage they 'deserve' as a two-digit float
function calcBonus(emp){
    var bonus;
    switch(emp.reviewRating){
        case 0: case 1: case 2:
            bonus = 0;
            break;
        case 3:
            bonus = 0.04;
            break;
        case 4:
            bonus = 0.06;
            break;
        case 5:
            bonus = 0.10;
            break;
        default:
            bonus = 0;
    }

    if(emp.employeeNumber.length===4){
        bonus += 0.05;
    };

    if(emp.annualSalary > 65000){
        bonus -= 0.01;
    };

    bonus=Math.min(0.13, bonus);
    bonus=Math.max(0.0, bonus);
    bonus.toFixed(2);
    
    return bonus;
}

// all code is hidden behind the click handler for the button object #btn on the DOM. will only run once - skips all actual code if div#output is visible
function showOutput(){
    if(!($('#output').is(':visible'))){
        
        //base mode through the end of this console.log
        var bonusArr = [];

        for (var i = 0; i < employees.length; i++) {
            bonusArr.push(bonus(employees[i]));
        }

        console.log(bonusArr);

        for (var i = 0; i < bonusArr.length; i++) {
            var person = bonusArr[i];
            // $('#output').append("<div id=\"" + person.name + "\"></div>");
            // var $currentDiv = $('#' + person.name);
            $('#output').show();
            $('#output').append("<h2 class=\"employee\">" + person.name + "</h2>");
            $('#output').append("<p class=\"data\">" + "<b>Bonus Percentage: </b>" + person.bonusPercentage * 100 + "%");
            $('#output').append("<p class=\"data\">" + "<b>Total Bonus: </b>$" + person.totalBonus.toFixed(2));
            $('#output').append("<p class=\"data\">" + "<b>Total Compensation: $</b>" + person.totalCompensation.toFixed(2));
        }
    }
}

// hey look, we're actually executing something here finally
$(document).ready(function(){
    $('#btn').click(showOutput);
});