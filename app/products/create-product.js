$(function(){

    $(document).on('click', '.create-product-button', function(){

        $.getJSON("/api/category/read.php", function(data){

        	var categories_options_html = `<select name='category_id' class='form-control'>`;
			$.each(data.records, function(key, val){
			    categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
			});

			categories_options_html += `</select>`;

			var create_product_html = `
			    <div id='read-products' class='btn btn-success read-products-button'>
			        Все продукты
			    </div>

			    <form id='create-product-form' action='#' method='post' border='0'>
				    <table class='table table-hover table-responsive table-bordered'>

				        <tr>
				            <td>Название</td>
				            <td><input type='text' name='name' class='form-control' required /></td>
				        </tr>

				        <tr>
				            <td>Цена</td>
				            <td><input type='number' name='price' class='form-control' required /></td>
				        </tr>

				        <tr>
				            <td>Количество</td>
				            <td><input type='number' name='quantity' class='form-control' required /></td>
				        </tr>

				        <tr>
				            <td>Описание</td>
				            <td><textarea name='description' class='form-control' required></textarea></td>
				        </tr>

				        <tr>
				            <td>Категория</td>
				            <td>` + categories_options_html + `</td>
				        </tr>

				        <tr>
				            <td></td>
				            <td>
				                <button type='submit' class='btn btn-primary'>
				                    Добавить продукт
				                </button>
				            </td>
				        </tr>

				    </table>
				</form>`;

			$("#page-content").html(create_product_html);

			changePageTitle("Добавление продукта");

		});

    });

    $(document).on('submit', '#create-product-form', function(){

	    var form_data=JSON.stringify($(this).serializeObject());

	    $.ajax({
	        url: "/api/product/create.php",
	        type : "POST",
	        contentType : 'application/json',
	        data : form_data,
	        success : function(result) {
	            showProducts();
	        },
	        error: function(xhr, resp, text) {
	            console.log(xhr, resp, text);
	        }
	    });
	    
	    return false;
	});

});