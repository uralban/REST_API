$(function() {

    showLoginPage();

    $(document).on('click', '#sign_up', function(){

        var html = `
            <h2>Регистрация</h2>
            <form id='sign_up_form'>
                <div class="form-group">
                    <label for="name">Имя</label>
                    <input type="text" class="form-control" name="name" id="name" required />
                </div>

                <div class="form-group">
                    <label for="login">Логин</label>
                    <input type="text" class="form-control" name="login" id="login" required />
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" class="form-control" name="password" id="password" required />
                </div>

                <button type='submit' class='btn btn-primary'>Зарегистрироваться</button>
            </form>
        `;

        clearResponse();
        $('#content').html(html);
    });

    $(document).on('submit', '#sign_up_form', function(){

        var sign_up_form=$(this);
        var form_data=JSON.stringify(sign_up_form.serializeObject());

        $.ajax({
            url: "/api/user/create_user.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {

                if (result.message == 'login error') {
                    $('#response').html("<div class='alert alert-danger'>Такой логин уже существует. Пожалуйста, придумайте другой.</div>");
                } else {
                    showLoginPage();
                    sign_up_form.find('input').val('');
                    $('#response').html("<div class='alert alert-success'>Регистрация завершена успешно. Пожалуйста, войдите.</div>");
                }                

            },
            error: function(xhr, resp, text){

                $('#response').html("<div class='alert alert-danger'>Невозможно зарегистрироваться. Пожалуйста, свяжитесь с администратором.</div>");

            }
        });

        return false;
    });

    $(document).on('click', '#sign_in', function(){
        showLoginPage();
    });

    $(document).on('submit', '#login_form', function(){

        var login_form=$(this);
        var form_data=JSON.stringify(login_form.serializeObject());

        $.ajax({
            url: "api/user/login.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result){

                setCookie("jwt", result.jwt, 1);

                showHomePage();
                $('#response').html("<div class='alert alert-success'>Успешный вход в систему</div>");

            },
            error: function(xhr, resp, text){

                $('#response').html("<div class='alert alert-danger'>Ошибка входа. Логин или пароль указан неверно.</div>");
                login_form.find('input').val('');
            }
        });

        return false;
    });

    $(document).on('click', '#home', function(){
        showHomePage();
        clearResponse();
    });

    $(document).on('click', '#update_account', function(){
        showUpdateAccountForm();
    });

    $(document).on('submit', '#update_account_form', function(){

        var update_account_form=$(this);

        var jwt = getCookie('jwt');

        var update_account_form_obj = update_account_form.serializeObject()

        update_account_form_obj.jwt = jwt;

        var form_data=JSON.stringify(update_account_form_obj);

        $.ajax({
            url: "api/user/update_user.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {

                setCookie("jwt", result.jwt, 1);

                showHomePage();

                $('#response').html("<div class='alert alert-success'>Учетная запись обновлена</div>");
            },

            error: function(xhr, resp, text){
                if(xhr.responseJSON.message=="Невозможно обновить пользователя"){
                    $('#response').html("<div class='alert alert-danger'>Невозможно обновить пользователя</div>");
                }

                else if(xhr.responseJSON.message=="Доступ закрыт."){
                    showLoginPage();
                    $('#response').html("<div class='alert alert-success'>Доступ закрыт. Пожалуйста войдите</div>");
                }
            }
        });

        return false;
    });

    $(document).on('click', '#logout', function(){
        showLoginPage();
        $('#response').html("<div class='alert alert-info'>Вы вышли из системы</div>");
    });

    function clearResponse(){
        $('#response').html('');
    }

    function showLoginPage(){

        setCookie("jwt", "", 1);

        var html = `
            <h2>Вход</h2>
            <form id='login_form'>
                <div class='form-group'>
                    <label for='login'>Логин</label>
                    <input type='text' class='form-control' id='login' name='login' placeholder='Введите логин'>
                </div>

                <div class='form-group'>
                    <label for='password'>Пароль</label>
                    <input type='password' class='form-control' id='password' name='password' placeholder='Введите пароль'>
                </div>
     
                <button type='submit' class='btn btn-primary'>Войти</button>
            </form>
            `;

        $('#content').html(html);
        clearResponse();
        showLoggedOutMenu();
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function showLoggedOutMenu(){
        
        $("#sign_in, #sign_up").show();
        $("#logout, #update_account").hide();
    }

    function showHomePage(){

        var jwt = getCookie('jwt');
        $.post("api/user/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {

            var html = `
                <div class="card">
                    <div class="card-header">Добро пожаловать!</div>
                </div>
                <div id="app">
                    <div class='container'>
                        <div class='page-header'>
                            <h1 id='page-title'>Все продукты</h1>
                        </div>
                        <div id='page-content'></div>
                    </div>
                </div>
            `;

            $('#content').html(html);
            showProducts();
            showLoggedInMenu();
        })

        .fail(function(result){
            showLoginPage();
            $('#response').html("<div class='alert alert-danger'>Пожалуйста войдите, чтобы получить доступ к домашней станице</div>");
        });
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' '){
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function showLoggedInMenu(){

        $("#sign_in, #sign_up").hide();
        $("#logout, #update_account").show();
    }

    function showUpdateAccountForm(){

      var jwt = getCookie('jwt');
      $.post("api/user/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {

        var html = `
                <h2>Обновление аккаунта</h2>
                <form id='update_account_form'>
                    <div class="form-group">
                        <label for="name">Имя</label>
                        <input type="text" class="form-control" name="name" id="name" required value="` + result.data.name + `" />
                    </div>

                    <div class="form-group">
                        <label for="login">Логин</label>
                        <input type="text" class="form-control" name="login" id="login" required value="` + result.data.login + `" />
                    </div>

                    <div class="form-group">
                        <label for="password">Пароль</label>
                        <input type="password" class="form-control" name="password" id="password" />
                    </div>

                    <button type='submit' class='btn btn-primary'>
                        Сохранить
                    </button>
                </form>
            `;

        clearResponse();
        $('#content').html(html);
      })

      .fail(function(result){
          showLoginPage();
          $('#response').html("<div class='alert alert-danger'>Пожалуйста, войдите, чтобы получить доступ к странице учетной записи</div>");
      });
    }
    
    $.fn.serializeObject = function(){

        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});