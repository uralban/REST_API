$(function(){

    $(document).on('click', '.create-categories-button', function(){
        
		var create_category_html = `
		    <div id='read-category' class='btn btn-success view-categories-button'>
		        Все категории
		    </div>

		    <form id='create-category-form' action='#' method='post' border='0'>
			    <table class='table table-hover table-responsive table-bordered'>

			        <tr>
			            <td>Название</td>
			            <td><input type='text' name='name' class='form-control' required /></td>
			        </tr>

			        <tr>
			            <td></td>
			            <td>
			                <button type='submit' class='btn btn-primary'>
			                    Добавить категорию
			                </button>
			            </td>
			        </tr>

			    </table>
			</form>`;

		$("#page-content").html(create_category_html);

		changePageTitle("Добавление категории");		

    });

    $(document).on('submit', '#create-category-form', function(){

	    var form_data=JSON.stringify($(this).serializeObject());

	    $.ajax({
	        url: "/api/category/create.php",
	        type : "POST",
	        contentType : 'application/json',
	        data : form_data,
	        success : function(result) {
	            showCategories();
	        },
	        error: function(xhr, resp, text) {
	            console.log(xhr, resp, text);
	        }
	    });
	    
	    return false;
	});

});