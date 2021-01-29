$(function(){

    $(document).on('click', '.read-products-button', function(){
	    showProducts();
	});

});

function showProducts(){

	$.getJSON("/api/product/read.php", function(data){

		var read_products_html=`
		    <div id='create-category' class='btn btn-success view-categories-button'>
		        Все категории
		    </div>
		    <div id='create-product' class='btn btn-info create-product-button'>
		        Добавить продукт
		    </div>
			<table class='table table-bordered table-hover'>
			    <tr>
			        <th>Название</th>
			        <th>Цена</th>
			        <th>Количество</th>
			        <th>Описание</th>
			        <th>Категория</th>
			        <th>Управление</th>
			    </tr>`;

		$.each(data.records, function(key, val) {

		    read_products_html+=`
		        <tr>
		            <td>` + val.name + `</td>
		            <td>` + val.price + `</td>
		            <td>` + val.quantity + `</td>
		            <td>` + val.description + `</td>
		            <td>` + val.category_name + `</td>
		            <td>
		                <button class='btn btn-warning update-product-button' data-id='` + val.id + `'>
		                    Редактировать
		                </button>
		                <button class='btn btn-danger delete-product-button' data-id='` + val.id + `'>
		                    Удалить
		                </button>
		            </td>
		        </tr>`;
		});

		read_products_html+=`</table>`;

		$("#page-content").html(read_products_html);

		changePageTitle("Все продукты");

	});	

}



