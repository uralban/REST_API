$(function(){

    $(document).on('click', '.view-categories-button', function(){
	    showCategories();
	});

});

function showCategories(){

	$.getJSON("/api/category/read.php", function(data){

		var read_products_html=`
		    <div id='read-products' class='btn btn-success read-products-button'>
		        Все продукты
		    </div>
		    <div id='create-category' class='btn btn-info create-categories-button'>
		        Добавить категорию
		    </div>
			<table class='table table-bordered table-hover'>
			    <tr>
			        <th>Название</th>
			        <th>Управление</th>
			    </tr>`;

		$.each(data.records, function(key, val) {

		    read_products_html += `
		        <tr>
		            <td>` + val.name + `</td>
		            <td>
		                <button class='btn btn-warning update-category-button' data-id='` + val.id + `'>
		                    Редактировать
		                </button>
		                <button class='btn btn-danger delete-category-button' data-id='` + val.id + `'>
		                    Удалить
		                </button>
		                <span>*при удалении, удаляются все продукты этой категории</span>
		            </td>
		        </tr>`;
		});

		read_products_html += `</table>`;

		$("#page-content").html(read_products_html);

		changePageTitle("Все категории");

	});	

}