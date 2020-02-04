
//////////////////////////////////////////////////////////////////////////////////////////
// Вызов команды на сервере --------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////
var Device = 0; // Номер устройства
var UrlServer = "http://192.168.15.101:5893/"; // HTTP адрес сервера торгового оборудования, если пусто то локальный вызов
var User = "Admin"; // Пользователь доступа к серверу торгового оборудования
var Password = ""; // Пароль доступа к серверу торгового оборудования

var Old_RRNCode = ""; // Для Экв. тер.
var Old_AuthorizationCode = ""; // Для Экв. тер.

function ExecuteCommand(Data, timeout, operation) {

    $('.Responce').html("");

    UrlServer = $("#SetServer").val();
    if (UrlServer == "AddIn") {

        KkmServer.Execute(function (message) {
            ExecuteSuccess(message, {}, {});
        }, Data);

    } else {

        if (!timeout) {
            timeout = 2300000; //Минута - некоторые драйверы при работе выполняют интерактивные действия с пользователем - тогда увеличте тайм-аут.
        }

        var JSon;
        if (typeof (Data) == "string") {
            JSon = Data;
        } else {
            JSon = $.toJSON(Data);
        };

        $.support.cors = true;
        var jqXHRvar = $.ajax({
            type: 'POST',
            async: true,
            timeout: timeout,
            url: app.kkmServer,
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            processData: false,
            data: JSon,
            headers: (User !== "" || Password !== "") ? { "Authorization": "Basic " + btoa(User + ":" + Password) } : "",
            success: ExecuteSuccess,
            error: ErrorSuccess
        });
    };
}

// Функция вызываемая после обработки команды - обработка возвращаемых данных
function ExecuteSuccess(Rezult, textStatus, jqXHR) {
    app.deviceOk(Rezult, textStatus, jqXHR)
    //----------------------------------------------------------------------
    // ОБЩЕЕ
    //----------------------------------------------------------------------

    var Responce = "";

    if (Rezult.Status == 0) {
        Responce = Responce + "Статус: " + "Ok" + "\r\n";
    } else if (Rezult.Status == 1) {
        Responce = Responce + "Статус: " + "Выполняется" + "\r\n";
    } else if (Rezult.Status == 2) {
        Responce = Responce + "Статус: " + "Ошибка!" + "\r\n";
    } else if (Rezult.Status == 3) {
        Responce = Responce + "Статус: " + "Данные не найдены!" + "\r\n";
    };

    // Текст ошибки
    if (Rezult.Error != undefined && Rezult.Error != "") {
        Responce = Responce + "Ошибка: " + Rezult.Error + "\r\n";
    }

    if (Rezult != undefined) {
        var JSon = JSON.stringify(Rezult, "", 4);
        Responce = Responce + "JSON ответа: \r\n" + JSon + "\r\n";

    }

    //$(".Responce").text(Responce);
}

// Функция вызываемая при ошибке передачи данных
function ErrorSuccess(jqXHR, textStatus, errorThrown) {
    app.deviceNotOk(jqXHR, textStatus, errorThrown)
}


// Пример печати  произвольного текста (Слип-чека)
function PrintSlip(NumDevice, my_aray_letters, cart) {

    let cartSum = function(){

        return cart.reduce((sum, current) => {
            return sum + current.count * current.price
        }, 0);

    }
    // Подготовка данных команды
    var Data = {
        Command: "RegisterCheck",
        NumDevice: NumDevice,
        IsFiscalCheck: false,
        NotPrint: false,
        IdCommand: guid(),

        // Строки чека
        CheckStrings: [
            //При вставке в текст символов ">#10#<" строка при печати выровнеется по центру, где 10 - это на сколько меньше станет строка ККТ
            // {
            //     PrintText: {
            //         Text: ">#2#<ООО \"Тестовая организация\"",
            //         Font: 1,
            //     },
            // },
            // При вставке в текст в середину строки символов "<#10#>" Левая часть строки будет выравнена по левому краю, правая по правому, где 10 - это на сколько меньше станет строка ККТ
            // При вставке в текст в середину строки символов "<#10#>>" Левая часть строки будет выравнена по правому краю, правая по правому, где 10 - отступ от правого клая
            { PrintText: { Text: "                   РОЯЛ БУРГЕР" }, },
            { PrintText: { Text: "  " }, },
            { PrintText: { Text: "  " }, },
            { PrintText: { Text: "<<->>" }, },
            { PrintText: { Text: my_aray_letters[0] }, },
            { PrintText: { Text: my_aray_letters[1] }, },
            { PrintText: { Text: my_aray_letters[2] }, },
            { PrintText: { Text: my_aray_letters[3] }, },
            { PrintText: { Text: my_aray_letters[4] }, },
            { PrintText: { Text: "  " }, },
            { PrintText: { Text: "  " }, },
            { PrintText: { Text: "<<->>" }, },
            // Строка с печатью текста определенным шрифтом
            // {
            //     PrintText: {
            //         Text: "Шрифт № 1",
            //         Font: 1, // 1-4, 0 - по настройкам ККМ
            //         Intensity: 15, // 1-15, 0 - по настройкам ККМ
            //     },
            // },
            // {
            //     PrintText: {
            //         Text: "Шрифт № 2",
            //         Font: 2, // 1-4, 0 - по настройкам ККМ
            //         Intensity: 10, // 1-15, 0 - по настройкам ККМ
            //     },
            // },
            // {
            //     PrintText: {
            //         Text: "Шрифт № 3",
            //         //Text: "Это тестовый товар. Тест на длинную строку в наименование товара или услуги.",
            //         Font: 3, // 1-4, 0 - по настройкам ККМ
            //         Intensity: 5, // 1-15, 0 - по настройкам ККМ
            //     },
            // },
            // {
            //     PrintText: {
            //         Text: "Шрифт № 4",
            //         Font: 4, // 1-4, 0 - по настройкам ККМ
            //         Intensity: 0, // 1-15, 0 - по настройкам ККМ
            //     },
            // },
        ],
    };

    for (let i of cart){
        Data.CheckStrings.push({ PrintText: { Text: i.count+" * "+i.name+"<#16#>0,00" }, })
        if(i.selected){
            for(let ii of i.selected){
                Data.CheckStrings.push({ PrintText: { Text: "          -"+ii.name }, })
            }
        }
    }

    Data.CheckStrings.push({ PrintText: { Text: "<<->>" }, })
    Data.CheckStrings.push({ PrintText: { Text: "Оплачено:<#8#>>0,00" }, })
    Data.CheckStrings.push({ PrintText: { Text: "Использовано бонусов:<#8#>>"+cartSum()+",00" }, })
    Data.CheckStrings.push({ PrintText: { Text: "<<->>" }, })
    Data.CheckStrings.push({ PrintText: { Text: "<<->>" }, })

    // Вызов команды
    ExecuteCommand(Data);
}

function guid() {

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function RegisterCheck(NumDevice, TypeCheck, IsBarCode, my_aray_letters, cart, slip, isFiscal) {
    let cartSum = function(){

        return cart.reduce((sum, current) => {
            return sum + current.count * current.price
        }, 0);

    }
    // Подготовка данных команды
    var Data = {
        // Команда серверу
        Command: "RegisterCheck",

        //***********************************************************************************************************
        // ПОЛЯ ПОИСКА УСТРОЙСТВА
        //***********************************************************************************************************
        // Номер устройства. Если 0 то первое не блокированное на сервере
        NumDevice: NumDevice,
        // ИНН ККМ для поиска. Если "" то ККМ ищется только по NumDevice,
        // Если NumDevice = 0 а InnKkm заполнено то ККМ ищется только по InnKkm
        InnKkm: "",
        //---------------------------------------------
        // Заводской номер ККМ для поиска. Если "" то ККМ ищется только по NumDevice,
        KktNumber: "",
        // **********************************************************************************************************

        // Время (сек) ожидания выполнения команды.
        //Если За это время команда не выполнилась в статусе вернется результат "NotRun" или "Run"
        //Проверить результат еще не выполненной команды можно командой "GetRezult"
        //Если не указано или 0 - то значение по умолчанию 60 сек.
        // Поле не обязательно. Это поле можно указывать во всех командах
        Timeout: 30,
        // Уникальный идентификатор команды. Любая строка из 40 символов - должна быть уникальна для каждой подаваемой команды
        // По этому идентификатору можно запросить результат выполнения команды
        // Поле не обязательно
        IdCommand: guid(),
        // Это фискальный или не фискальный чек
        IsFiscalCheck: isFiscal,
        // Тип чека;
        // 0 – продажа;                             10 – покупка;
        // 1 – возврат продажи;                     11 - возврат покупки;
        // 8 - продажа только по ЕГАИС (обычный чек ККМ не печатается)
        // 9 - возврат продажи только по ЕГАИС (обычный чек ККМ не печатается)
        TypeCheck: TypeCheck,
        // Не печатать чек на бумагу
        NotPrint: false, //true,
        // Количество копий документа
        NumberCopies: 0,
        // Продавец, тег ОФД 1021
        CashierName: "Киоск самообслуживния",
        // ИНН продавца тег ОФД 1203
        CashierVATIN: "430601071197",
        // Телефон или е-Майл покупателя, тег ОФД 1008
        // Если чек не печатается (NotPrint = true) то указывать обязательно
        // Формат: Телефон +{Ц} Email {С}@{C}
        ClientAddress: "test@mail.com",
        // Aдрес электронной почты отправителя чека тег ОФД 1117 (если задан при регистрации можно не указывать)
        // Формат: Email {С}@{C}
        SenderEmail: "sochi@mama.com",
        // Система налогообложения (СНО) применяемая для чека
        // Если не указанно - система СНО настроенная в ККМ по умолчанию
        // 0: Общая ОСН
        // 1: Упрощенная УСН (Доход)
        // 2: Упрощенная УСН (Доход минус Расход)
        // 3: Единый налог на вмененный доход ЕНВД
        // 4: Единый сельскохозяйственный налог ЕСН
        // 5: Патентная система налогообложения
        // Комбинация разных СНО не возможна
        // Надо указывать если ККМ настроена на несколько систем СНО
        TaxVariant: "",

        // Строки чека
        CheckStrings: [
            // Строка с печатью простого текста
            // При вставке в текст в середину строки символов "<#10#>" Левая часть строки будет выравнена по левому краю, правая по правому, где 10 - это на сколько меньше станет строка ККТ
            // При вставке в текст в середину строки символов "<#10#>>" Левая часть строки будет выравнена по правому краю, правая по правому, где 10 - отступ от правого клая
            { PrintText: { Text: my_aray_letters[0] }, },
            { PrintText: { Text: my_aray_letters[1] }, },
            { PrintText: { Text: my_aray_letters[2] }, },
            { PrintText: { Text: my_aray_letters[3] }, },
            { PrintText: { Text: my_aray_letters[4] }, },
            { PrintText: { Text: "  " }, },
            { PrintText: { Text: "  " }, },
            // Строка с печатью текста определенным шрифтом
            // Строка с печатью фискальной строки

        ],

        // Наличная оплата (2 знака после запятой)
        Cash: 0.00,
        // Сумма электронной оплаты (2 знака после запятой)
        ElectronicPayment: cartSum().toFixed(2),
        // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        AdvancePayment: 0,
        // Сумма постоплатой(в кредит) (2 знака после запятой)
        Credit: 0,
        // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
        CashProvision: 0,

    };

  for(let n in slip)  {

      let slipString = { PrintText: { Text: slip[n] }, }
      Data.CheckStrings.push(slipString)
  }


  for(let i in cart){


      let fiscalString =             {
          Register: {
              // Наименование товара 64 символа
              Name: cart[i].name,
              // Количество товара (3 знака после запятой)
              Quantity: cart[i].count,
              // Цена за шт. без скидки (2 знака после запятой)
              Price: cart[i].price,
              // Конечная сумма строки с учетом всех скидок/наценок; (2 знака после запятой)
              Amount: cart[i].price*cart[i].count,
              // Отдел, по которому ведется продажа
              Department: 0,
              // НДС в процентах или ТЕГ НДС: 0 (НДС 0%), 10 (НДС 10%), 20 (НДС 20%), -1 (НДС не облагается), 120 (НДС 20/120), 110 (НДС 10/110)
              Tax: -1,
              //Штрих-код EAN13 для передачи в ОФД (не печатется)
              EAN13: "1254789547853",
              // Признак способа расчета. тег ОФД 1214. Для ФФД.1.05 и выше обязательное поле
              // 1: "ПРЕДОПЛАТА 100% (Полная предварительная оплата до момента передачи предмета расчета)"
              // 2: "ПРЕДОПЛАТА (Частичная предварительная оплата до момента передачи предмета расчета)"
              // 3: "АВАНС"
              // 4: "ПОЛНЫЙ РАСЧЕТ (Полная оплата, в том числе с учетом аванса в момент передачи предмета расчета)"
              // 5: "ЧАСТИЧНЫЙ РАСЧЕТ И КРЕДИТ (Частичная оплата предмета расчета в момент его передачи с последующей оплатой в кредит )"
              // 6: "ПЕРЕДАЧА В КРЕДИТ (Передача предмета расчета без его оплаты в момент его передачи с последующей оплатой в кредит)"
              // 7: "ОПЛАТА КРЕДИТА (Оплата предмета расчета после его передачи с оплатой в кредит )"
              SignMethodCalculation: 1,
              // Признак предмета расчета. тег ОФД 1212. Для ФФД.1.05 и выше обязательное поле
              // 1: "ТОВАР (наименование и иные сведения, описывающие товар)"
              // 2: "ПОДАКЦИЗНЫЙ ТОВАР (наименование и иные сведения, описывающие товар)"
              // 3: "РАБОТА (наименование и иные сведения, описывающие работу)"
              // 4: "УСЛУГА (наименование и иные сведения, описывающие услугу)"
              // 5: "СТАВКА АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
              // 6: "ВЫИГРЫШ АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
              // 7: "ЛОТЕРЕЙНЫЙ БИЛЕТ (при осуществлении деятельности по проведению лотерей)"
              // 8: "ВЫИГРЫШ ЛОТЕРЕИ (при осуществлении деятельности по проведению лотерей)"
              // 9: "ПРЕДОСТАВЛЕНИЕ РИД (предоставлении прав на использование результатов интеллектуальной деятельности или средств индивидуализации)"
              // 10: "ПЛАТЕЖ (аванс, задаток, предоплата, кредит, взнос в счет оплаты, пени, штраф, вознаграждение, бонус и иной аналогичный предмет расчета)"
              // 11: "АГЕНТСКОЕ ВОЗНАГРАЖДЕНИЕ (вознаграждение (банковского)платежного агента/субагента, комиссионера, поверенного или иным агентом)"
              // 12: "СОСТАВНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, состоящем из предметов, каждому из которых может быть присвоено вышестоящее значение"
              // 13: "ИНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, не относящемуся к предметам расчета, которым может быть присвоено вышестоящее значение"
              // 14: "ИМУЩЕСТВЕННОЕ ПРАВО" (передача имущественных прав)
              // 15: "ВНЕРЕАЛИЗАЦИОННЫЙ ДОХОД"
              // 16: "СТРАХОВЫЕ ВЗНОСЫ" (суммы расходов, уменьшающих сумму налога (авансовых платежей) в соответствии с пунктом 3.1 статьи 346.21 Налогового кодекса Российской Федерации)
              // 17: "ТОРГОВЫЙ СБОР" (суммы уплаченного торгового сбора)
              // 18: "КУРОРТНЫЙ СБОР"
              // 19: "ЗАЛОГ"
              SignCalculationObject: 1,
              // Единица измерения предмета расчета. Можно не указывать
              MeasurementUnit: "шт"

          }
      }

      Data.CheckStrings.push(fiscalString)

  }




    //Если чек без ШК то удаляем строку с ШК
    if (IsBarCode == false) {
        //Data.Cash = 100;
        for (var i = 0; i < Data.CheckStrings.length; i++) {
            if (Data.CheckStrings[i] != undefined && Data.CheckStrings[i].BarCode != undefined) {
                Data.CheckStrings[i].BarCode = null;
            };
            if (Data.CheckStrings[i] != undefined && Data.CheckStrings[i].PrintImage != undefined) {
                Data.CheckStrings[i].PrintImage = null;
            };
        };
    };

    //Скидываем данные об агенте - т.к.у Вас невярнека ККТ не зарегистрирована как Агент.
    Data.AgentSign = null;
    Data.AgentData = null;
    Data.PurveyorData = null;
    for (var i = 0; i < Data.CheckStrings.length; i++) {
        if (Data.CheckStrings[i] != undefined && Data.CheckStrings[i].Register != undefined) {
            Data.CheckStrings[i].Register.AgentSign = null;
            Data.CheckStrings[i].Register.AgentData = null;
            Data.CheckStrings[i].Register.PurveyorData = null;
        };
    };

    // Вызов команды
    ExecuteCommand(Data);


}

function ReturnCheck(NumDevice, cart, slip) {

    let cartSum = function(){

        return cart.reduce((sum, current) => {
            return sum + current.count * current.price
        }, 0);

    }
    // Подготовка данных команды
    var Data = {
        // Команда серверу
        Command: "RegisterCheck",

        //***********************************************************************************************************
        // ПОЛЯ ПОИСКА УСТРОЙСТВА
        //***********************************************************************************************************
        // Номер устройства. Если 0 то первое не блокированное на сервере
        NumDevice: NumDevice,
        // ИНН ККМ для поиска. Если "" то ККМ ищется только по NumDevice,
        // Если NumDevice = 0 а InnKkm заполнено то ККМ ищется только по InnKkm
        InnKkm: "",
        //---------------------------------------------
        // Заводской номер ККМ для поиска. Если "" то ККМ ищется только по NumDevice,
        KktNumber: "",
        // **********************************************************************************************************

        // Время (сек) ожидания выполнения команды.
        //Если За это время команда не выполнилась в статусе вернется результат "NotRun" или "Run"
        //Проверить результат еще не выполненной команды можно командой "GetRezult"
        //Если не указано или 0 - то значение по умолчанию 60 сек.
        // Поле не обязательно. Это поле можно указывать во всех командах
        Timeout: 30,
        // Уникальный идентификатор команды. Любая строка из 40 символов - должна быть уникальна для каждой подаваемой команды
        // По этому идентификатору можно запросить результат выполнения команды
        // Поле не обязательно
        IdCommand: guid(),
        // Это фискальный или не фискальный чек
        IsFiscalCheck: true,
        // Тип чека;
        // 0 – продажа;                             10 – покупка;
        // 1 – возврат продажи;                     11 - возврат покупки;
        // 8 - продажа только по ЕГАИС (обычный чек ККМ не печатается)
        // 9 - возврат продажи только по ЕГАИС (обычный чек ККМ не печатается)
        TypeCheck: 1,
        // Не печатать чек на бумагу
        NotPrint: false, //true,
        // Количество копий документа
        NumberCopies: 0,
        // Продавец, тег ОФД 1021
        CashierName: "Киоск самообслуживния",
        // ИНН продавца тег ОФД 1203
        CashierVATIN: "430601071197",
        // Телефон или е-Майл покупателя, тег ОФД 1008
        // Если чек не печатается (NotPrint = true) то указывать обязательно
        // Формат: Телефон +{Ц} Email {С}@{C}
        ClientAddress: "test@mail.com",
        // Aдрес электронной почты отправителя чека тег ОФД 1117 (если задан при регистрации можно не указывать)
        // Формат: Email {С}@{C}
        SenderEmail: "sochi@mama.com",
        // Система налогообложения (СНО) применяемая для чека
        // Если не указанно - система СНО настроенная в ККМ по умолчанию
        // 0: Общая ОСН
        // 1: Упрощенная УСН (Доход)
        // 2: Упрощенная УСН (Доход минус Расход)
        // 3: Единый налог на вмененный доход ЕНВД
        // 4: Единый сельскохозяйственный налог ЕСН
        // 5: Патентная система налогообложения
        // Комбинация разных СНО не возможна
        // Надо указывать если ККМ настроена на несколько систем СНО
        TaxVariant: "",

        // Строки чека
        CheckStrings: [
            // Строка с печатью простого текста
            // При вставке в текст в середину строки символов "<#10#>" Левая часть строки будет выравнена по левому краю, правая по правому, где 10 - это на сколько меньше станет строка ККТ
            // При вставке в текст в середину строки символов "<#10#>>" Левая часть строки будет выравнена по правому краю, правая по правому, где 10 - отступ от правого клая
            { PrintText: { Text: "  " }, },
            // Строка с печатью текста определенным шрифтом
            // Строка с печатью фискальной строки

        ],

        // Наличная оплата (2 знака после запятой)
        Cash: 0.00,
        // Сумма электронной оплаты (2 знака после запятой)
        ElectronicPayment: cartSum().toFixed(2),
        // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        AdvancePayment: 0,
        // Сумма постоплатой(в кредит) (2 знака после запятой)
        Credit: 0,
        // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
        CashProvision: 0,

    };

  for(let n in slip)  {

      let slipString = { PrintText: { Text: slip[n] }, }
      Data.CheckStrings.push(slipString)
  }


  for(let i in cart){


      let fiscalString =             {
          Register: {
              // Наименование товара 64 символа
              Name: cart[i].name,
              // Количество товара (3 знака после запятой)
              Quantity: cart[i].count,
              // Цена за шт. без скидки (2 знака после запятой)
              Price: cart[i].price,
              // Конечная сумма строки с учетом всех скидок/наценок; (2 знака после запятой)
              Amount: cart[i].price*cart[i].count,
              // Отдел, по которому ведется продажа
              Department: 0,
              // НДС в процентах или ТЕГ НДС: 0 (НДС 0%), 10 (НДС 10%), 20 (НДС 20%), -1 (НДС не облагается), 120 (НДС 20/120), 110 (НДС 10/110)
              Tax: -1,
              //Штрих-код EAN13 для передачи в ОФД (не печатется)
              EAN13: "1254789547853",
              // Признак способа расчета. тег ОФД 1214. Для ФФД.1.05 и выше обязательное поле
              // 1: "ПРЕДОПЛАТА 100% (Полная предварительная оплата до момента передачи предмета расчета)"
              // 2: "ПРЕДОПЛАТА (Частичная предварительная оплата до момента передачи предмета расчета)"
              // 3: "АВАНС"
              // 4: "ПОЛНЫЙ РАСЧЕТ (Полная оплата, в том числе с учетом аванса в момент передачи предмета расчета)"
              // 5: "ЧАСТИЧНЫЙ РАСЧЕТ И КРЕДИТ (Частичная оплата предмета расчета в момент его передачи с последующей оплатой в кредит )"
              // 6: "ПЕРЕДАЧА В КРЕДИТ (Передача предмета расчета без его оплаты в момент его передачи с последующей оплатой в кредит)"
              // 7: "ОПЛАТА КРЕДИТА (Оплата предмета расчета после его передачи с оплатой в кредит )"
              SignMethodCalculation: 1,
              // Признак предмета расчета. тег ОФД 1212. Для ФФД.1.05 и выше обязательное поле
              // 1: "ТОВАР (наименование и иные сведения, описывающие товар)"
              // 2: "ПОДАКЦИЗНЫЙ ТОВАР (наименование и иные сведения, описывающие товар)"
              // 3: "РАБОТА (наименование и иные сведения, описывающие работу)"
              // 4: "УСЛУГА (наименование и иные сведения, описывающие услугу)"
              // 5: "СТАВКА АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
              // 6: "ВЫИГРЫШ АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
              // 7: "ЛОТЕРЕЙНЫЙ БИЛЕТ (при осуществлении деятельности по проведению лотерей)"
              // 8: "ВЫИГРЫШ ЛОТЕРЕИ (при осуществлении деятельности по проведению лотерей)"
              // 9: "ПРЕДОСТАВЛЕНИЕ РИД (предоставлении прав на использование результатов интеллектуальной деятельности или средств индивидуализации)"
              // 10: "ПЛАТЕЖ (аванс, задаток, предоплата, кредит, взнос в счет оплаты, пени, штраф, вознаграждение, бонус и иной аналогичный предмет расчета)"
              // 11: "АГЕНТСКОЕ ВОЗНАГРАЖДЕНИЕ (вознаграждение (банковского)платежного агента/субагента, комиссионера, поверенного или иным агентом)"
              // 12: "СОСТАВНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, состоящем из предметов, каждому из которых может быть присвоено вышестоящее значение"
              // 13: "ИНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, не относящемуся к предметам расчета, которым может быть присвоено вышестоящее значение"
              // 14: "ИМУЩЕСТВЕННОЕ ПРАВО" (передача имущественных прав)
              // 15: "ВНЕРЕАЛИЗАЦИОННЫЙ ДОХОД"
              // 16: "СТРАХОВЫЕ ВЗНОСЫ" (суммы расходов, уменьшающих сумму налога (авансовых платежей) в соответствии с пунктом 3.1 статьи 346.21 Налогового кодекса Российской Федерации)
              // 17: "ТОРГОВЫЙ СБОР" (суммы уплаченного торгового сбора)
              // 18: "КУРОРТНЫЙ СБОР"
              // 19: "ЗАЛОГ"
              SignCalculationObject: 1,
              // Единица измерения предмета расчета. Можно не указывать
              MeasurementUnit: "шт"

          }
      }

      Data.CheckStrings.push(fiscalString)

  }



    let IsBarCode = false
    //Если чек без ШК то удаляем строку с ШК
    if (IsBarCode == false) {
        //Data.Cash = 100;
        for (var i = 0; i < Data.CheckStrings.length; i++) {
            if (Data.CheckStrings[i] != undefined && Data.CheckStrings[i].BarCode != undefined) {
                Data.CheckStrings[i].BarCode = null;
            };
            if (Data.CheckStrings[i] != undefined && Data.CheckStrings[i].PrintImage != undefined) {
                Data.CheckStrings[i].PrintImage = null;
            };
        };
    };

    //Скидываем данные об агенте - т.к.у Вас невярнека ККТ не зарегистрирована как Агент.
    Data.AgentSign = null;
    Data.AgentData = null;
    Data.PurveyorData = null;
    for (var i = 0; i < Data.CheckStrings.length; i++) {
        if (Data.CheckStrings[i] != undefined && Data.CheckStrings[i].Register != undefined) {
            Data.CheckStrings[i].Register.AgentSign = null;
            Data.CheckStrings[i].Register.AgentData = null;
            Data.CheckStrings[i].Register.PurveyorData = null;
        };
    };

    // Вызов команды
    ExecuteCommand(Data);


}

function returnArrayLetters(my_string){
    let letterF = [
        ' $$$$$ ',
        ' $$    ',
        ' $$$$  ',
        ' $$    ',
        ' $$    ',
    ];
    let letterK = [
        ' $$  $$',
        ' $$ $$ ',
        ' $$$   ',
        ' $$ $$ ',
        ' $$  $$',
    ];
    let letterG = [
        '  $$$$ ',
        ' $$    ',
        ' $$ $$$',
        ' $$  $$',
        '  $$$$ ',
    ];
    let letter1 = [
        '    $$',
        '  $$$$',
        '    $$',
        '    $$',
        '    $$',
    ];

    let letter2 = [
        '  $$$$ ',
        ' $$  $$',
        '    $$ ',
        '  $$   ',
        ' $$$$$$',
    ];
    let letter3 = [
        '  $$$$ ',
        ' $   $$',
        '   $$$ ',
        ' $   $$',
        '  $$$$ ',
    ];
    let letter4 = [
        ' $$    ',
        ' $$  $$',
        ' $$$$$$',
        '     $$',
        '     $$',
    ];
    let letter5 = [
        ' $$$$$ ',
        ' $$    ',
        ' $$$$$ ',
        '     $$',
        ' $$$$$ ',
    ];
    let letter6 = [
        '  $$$$ ',
        ' $$    ',
        ' $$$$$ ',
        ' $$  $$',
        '  $$$$ ',
    ];
    let letter7 = [
        ' $$$$$$',
        ' $$  $$',
        '    $$ ',
        '   $$  ',
        '  $$   ',
    ];
    let letter8 = [
        '  $$$$ ',
        ' $$  $$',
        '  $$$$ ',
        ' $$  $$',
        '  $$$$ ',
    ];
    let letter9 = [
        '  $$$$ ',
        ' $$  $$',
        '  $$$$$',
        '     $$',
        '  $$$$ ',
    ];
    let letter0 = [
        '  $$$$ ',
        ' $$  $$',
        ' $$  $$',
        ' $$  $$',
        '  $$$$ ',
    ];
    let letterTire = [
        '       ',
        '       ',
        '  $$$  ',
        '       ',
        '       ',
    ];


    my_string = my_string.toLowerCase();
    let my_aray_letters = [
        '      ',
        '      ',
        '      ',
        '      ',
        '      ',
    ];
    for (let index = 0; index < my_string.length; index++)
    {
        let this_array = ['', '', '', '', '',];
        let char = my_string[index];
        if (char == 'k') { this_array = letterK; }
        if (char == 'f') { this_array = letterF; }
        if (char == 'g') { this_array = letterG; }
        if (char == '1') { this_array = letter1; }
        if (char == '2') { this_array = letter2; }
        if (char == '3') { this_array = letter3; }
        if (char == '4') { this_array = letter4; }
        if (char == '5') { this_array = letter5; }
        if (char == '6') { this_array = letter6; }
        if (char == '7') { this_array = letter7; }
        if (char == '8') { this_array = letter8; }
        if (char == '9') { this_array = letter9; }
        if (char == '0') { this_array = letter0; }
        if (char == '-') { this_array = letterTire; }
        my_aray_letters[0] = my_aray_letters[0] +' '+this_array[0];
        my_aray_letters[1] = my_aray_letters[1] +' '+this_array[1];
        my_aray_letters[2] = my_aray_letters[2] +' '+this_array[2];
        my_aray_letters[3] = my_aray_letters[3] +' '+this_array[3];
        my_aray_letters[4] = my_aray_letters[4] +' '+this_array[4];

    }
    return my_aray_letters;
}

// Печать закрытия смены
function CloseShift(NumDevice) {

    // Подготовка данных команды
    var Data = {
        // Команда серверу
        Command: "CloseShift",
        // Номер устройства. Если 0 то первое не блокированное на сервере
        NumDevice: NumDevice,
        // Продавец, тег ОФД 1021
        CashierName: "Иванов И.И.",
        // ИНН продавца тег ОФД 1203
        CashierVATIN: "430601071197",
        // Не печатать чек на бумагу
        NotPrint: false,
        // Id устройства. Строка. Если = "" то первое не блокированное на сервере
        IdDevice: "",
        // Уникальный идентификатор команды. Любая строока из 40 символов - должна быть уникальна для каждой подаваемой команды
        // По этому идентификатору можно запросить результат выполнения команды
        IdCommand: guid(),
    };

    // Вызов команды
    ExecuteCommand(Data);

    // Возвращается JSON:
    //{
    //    "CheckNumber": 1,    // Номер документа
    //    "SessionNumber": 23, // Номер смены
    //    "QRCode": "t=20170904T141100&fn=9999078900002287&i=108&fp=605445600",
    //    "Command": "CloseShift",
    //    "Error": "",  // Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять
    //    "Status": 0   // Ok = 0, Run(Запущено на выполнение) = 1, Error = 2, NotFound(устройство не найдено) = 3, NotRun = 4
    //}

}

// Печать X отчета
function XReport(NumDevice) {

    // Подготовка данных команды
    var Data = {
        // Команда серверу
        Command: "XReport",
        // Номер устройства. Если 0 то первое не блокированное на сервере
        NumDevice: NumDevice,
        // Id устройства. Строка. Если = "" то первое не блокированное на сервере
        IdDevice: "",
        // Уникальный идентификатор команды. Любая строока из 40 символов - должна быть уникальна для каждой подаваемой команды
        // По этому идентификатору можно запросить результат выполнения команды
        IdCommand: guid(),
    };

    // Вызов команды
    ExecuteCommand(Data);
}


// Оплата безналом
function PaymentByPaymentCard(NumDevice, sum) {

    // Подготовка данных команды
    var Data = {
        Command: "PayByPaymentCard",
        NumDevice: NumDevice,
        CardNumber: "",
        Amount: sum,
        ReceiptNumber: "TEST-01",
        IdCommand: guid(),
    }

    // Вызов команды
    ExecuteCommand(Data);
}

function ReturnPaymentByPaymentCard(NumDevice, data, operation) {


    var Data = {
        Command: "ReturnPaymentByPaymentCard",
        NumDevice: NumDevice,
        CardNumber: "",

        Amount: data.order.sum,

        ReceiptNumber: data.order.id,
        RRNCode: data.order.RRNCode,
        AuthorizationCode: data.order.AuthorizationCode,
        IdCommand: guid()

    };


    ExecuteCommand(Data, false, operation);

}

function Settlement(NumDevice) {

    // Подготовка данных команды
    var Data = {
        // Команда серверу
        Command: "Settlement",
        // Номер устройства. Если 0 то первое не блокированное на сервере
        NumDevice: NumDevice,
        // Уникальный идентификатор команды. Любая строка из 40 символов - должна быть уникальна для каждой подаваемой команды
        // По этому идентификатору можно запросить результат выполнения команды
        // Поле не обязательно
        IdCommand: guid()

    };

    // Вызов команды
    ExecuteCommand(Data);
}

async function sendNew(server, unit, checkType, station, name, parent){
    try {
        const { data } = await axios.get(server+'/new', {
            params: {
                id: guid(),
                unit,
                checkType,
                station,
                name,
                parent
            }
        })
        return data
    } catch (e) {
        throw new Error(e)
    }
}


async function checkBonusSD(phone){
    try {
        const { sum } = await axios.get('https://delivery.rb24.ru/bonus_api/check', {
            params: {
                phone,
                apikey: "MDU3NThhMTYxMGE4ZDYyM2M3OTk0NDc1ODg1ZmVlYzU4N2FmMmJjMg"
            }
        })
        return sum
    } catch (e) {
        throw new Error(e)
    }
}


async function sendNewCheck(server, id, checkType){
    try {
        const { data } = await axios.get(server+'/newCheck', {
            params: {
                id,
                checkType
            }
        })
        return data
    } catch (e) {
        throw new Error(e)
    }
}




async function SendET(server, cart, message, msgId, orderType){

    if(message){
        await sendNew(server, msgId, orderType, 0, message, "")
                }
    if(cart){
        for (let it in cart){
            if(cart[it].selected){
                for(let ii in cart[it].selected){
                    for(let c = 1; c <= cart[it].count; c++){
                        let [parent] = app.groups.filter(gr => gr.id == cart[it].selected[ii].groupId)
                        await sendNew(server, msgId, orderType, cart[it].selected[ii].station, cart[it].selected[ii].name, parent.name)

                    }

                }


            }
            else{
                for(let c = 1; c <= cart[it].count; c++){
                    let [parent] = app.groups.filter(gr => gr.id == cart[it].groupId)
                    await sendNew(server, msgId, orderType, cart[it].station, cart[it].name, parent.name)

                }

            }



        }
        await sendNewCheck(server, msgId, orderType)

    }

}

