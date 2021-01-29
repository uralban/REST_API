$(function(){

    $(document).on('click', '.update-product-button', function(){

        var id = $(this).attr('data-id');

        $.getJSON("/api/product/read_one.php?id=" + id, function(data){

		    var name = data.name;
		    var price = data.price;
		    var quantity = data.quantity;
		    var description = data.description;
		    var category_id = data.category_id;
		    var category_name = data.category_name;

		    $.getJSON("/api/category/read.php", function(data){

			    var categories_options_html=`<select name='category_id' class='form-control'>`;

			    $.each(data.records, function(key, val){
			        if (val.id==category_id) {
			            categories_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`;
			        } else {
			            categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`; 
			        }
			    });

			    categories_options_html += `</select>`;

			    var update_product_html = `
				    <div id='read-products' class='btn btn-success read-products-button'>
				        Все продукты
				    </div>

				    <form id='update-product-form' action='#' method='post' border='0'>
				        <table class='table table-hover table-responsive table-bordered'>

				            <tr>
				                <td>Название</td>
				                <td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
				            </tr>

				            <tr>
				                <td>Цена</td>
				                <td><input value=\"` + price + `\" type='number' min='1' name='price' class='form-control' required /></td>
				            </tr>

				            <tr>
				                <td>Количество</td>
				                <td><input value=\"` + price + `\" type='number' min='1' name='quantity' class='form-control' required /></td>
				            </tr>

				            <tr>
				                <td>Описание</td>
				                <td><textarea name='description' class='form-control' required>` + description + `</textarea></td>
				            </tr>

				            <tr>
				                <td>Категория</td>
				                <td>` + categories_options_html + `</td>
				            </tr>

				            <tr>
				                <td><input value=\"` + id + `\" name='id' type='hidden' /></td>

				                <td>
				                    <button type='submit' class='btn btn-primary'>
				                        Обновить продукт
				                    </button>
				                </td>
				            </tr>

				        </table>
				    </form>
				`;

				$("#page-content").html(update_product_html);

				changePageTitle("Обновление продукта");
			});
		});

    });

    $(document).on('submit', '#update-product-form', function(){

	    var form_data=JSON.stringify($(this).serializeObject());

	    $.ajax({
	        url: "/api/product/update.php",
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