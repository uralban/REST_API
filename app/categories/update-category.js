$(function(){

    $(document).on('click', '.update-category-button', function(){

        var id = $(this).attr('data-id');

        $.getJSON("/api/category/read_one.php?id=" + id, function(data){

		    var name = data.name;		    
			    
		    var update_category_html = `
			    <div id='read-category' class='btn btn-success view-categories-button'>
			        Все категории
			    </div>

			    <form id='update-category-form' action='#' method='post' border='0'>
			        <table class='table table-hover table-responsive table-bordered'>

			            <tr>
			                <td>Название</td>
			                <td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
			            </tr>

			            <tr>
			                <td><input value=\"` + id + `\" name='id' type='hidden' /></td>

			                <td>
			                    <button type='submit' class='btn btn-primary'>
			                        Обновить категорию
			                    </button>
			                </td>
			            </tr>

			        </table>
			    </form>
			`;

			$("#page-content").html(update_category_html);

			changePageTitle("Обновление категории");
			
		});

    });

    $(document).on('submit', '#update-category-form', function(){

	    var form_data=JSON.stringify($(this).serializeObject());

	    $.ajax({
	        url: "/api/category/update.php",
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