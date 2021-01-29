<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Каталог продуктов</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <link href="app/assets/css/style.css" rel="stylesheet" />

</head>
<body>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div id="navbarNavAltMarkup">
      <div class="navbar-nav">
          <a class="nav-item nav-link" href="#" id='update_account'>Учетная запись</a>
          <a class="nav-item nav-link" href="#" id='logout'>Выход</a>
          <a class="nav-item nav-link" href="#" id='sign_in'>Вход</a>
          <a class="nav-item nav-link" href="#" id='sign_up'>Регистрация</a>
      </div>
  </div>
</nav>

<main role="main" class="container">
 
  <div class="row">
      <div class="col">

          <div id="response"></div>

          <div id="content"></div>
      </div>
  </div>

</main>


<script src="app/assets/js/jquery.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

<script src="app/app.js"></script>

<script src="app/products/read-products.js"></script>
<script src="app/products/create-product.js"></script>
<script src="app/products/update-product.js"></script>
<script src="app/products/delete-product.js"></script>
<script src="app/categories/read-categories.js"></script>
<script src="app/categories/create-category.js"></script>
<script src="app/categories/update-category.js"></script>
<script src="app/categories/delete-category.js"></script>
<script src="app/users/sign-up.js"></script>

</body>
</html>