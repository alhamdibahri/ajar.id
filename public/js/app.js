var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;

manageData();

function manageData() {
    $.ajax({
        dataType: 'json',
        url: url,
        data: {page:page}
    }).done(function(data){
        total_page = data.meta.last_page;
        current_page = data.meta.current_page;

        $('#pagination').twbsPagination({
            totalPages: total_page,
            visiblePages: current_page,

            onPageClick: function (event, pageL) {
                page = pageL;
                if(is_ajax_fire != 0){
                    getPageData();
                }
            }
        });

        manageRow(data.data);
        is_ajax_fire = 1;
    });
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function getPageData() {
    $.ajax({
        dataType: 'json',
        url: url,
        data: {page:page}
    }).done(function(data){
        manageRow(data.data);
    });
}

function manageRow(data) {
    var	rows = '';
    $.each( data, function( key, value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.name+'</td>';
        rows = rows + '<td>'+value.email+'</td>';
        rows = rows + '<td>'+value.address+'</td>';
        rows = rows + '<td>'+value.gender+'</td>';
        rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
        rows = rows + '<button class="btn btn-danger remove-item" data-id="'+ value.gender +'">Delete</button>';
        rows = rows + '</td>';
        rows = rows + '</tr>';
    });

    $("tbody").html(rows);
}

$(".crud-submit").click(function(e){
    e.preventDefault();

    $('#validation-errors').html('');
    var form_action = $("#create-item").find("form").attr("action");
    var name = $("#create-item").find("input[name='name']").val();
    var email = $("#create-item").find("input[name='email']").val();
    var gender = $("#create-item").find("input[name='gender']:checked").val();
    var address = $("#create-item").find("textarea[name='address']").val();

    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{name:name, email:email, gender:gender, address:address}
    }).done(function(data){
        getPageData();
        $(".modal").modal('hide');
        toastr.success('Employee Created Successfully.', 'Success Alert', {timeOut: 5000});
    }).fail(function (error) {
        if (error.status == 422){
            $.each(error.responseJSON.errors, function(key,value) {
                $('#validation-errors').append('<li style="background-color: #d9534f; color: white;">'+value+'</li>');
            });
        }
    });;
});

$("body").on("click",".remove-item",function(){
    var id = $(this).parent("td").data('id');
    var c_obj = $(this).parents("tr");

    $.ajax({
        dataType: 'json',
        type:'delete',
        url: url + '/' + id,
    }).done(function(data){
        c_obj.remove();
        toastr.success('Employee Deleted Successfully.', 'Success Alert', {timeOut: 5000});
        getPageData();
        // console.log(data)
    }).fail(function (error) {
        console.log(error)
    })
});

$("body").on("click",".edit-item",function(){
    var id = $(this).parent("td").data('id');
    var name = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var email = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var address = $(this).parent("td").prev("td").prev("td").text();
    var gender = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='name']").val(name);
    $("#edit-item").find("input[name='id']").val(id);
    $("#edit-item").find("input[name='email']").val(email);
    $("#edit-item").find("textarea[name='address']").val(address);
    $("#edit-item").find('input[name="gender"][value="'+gender+'"]').prop('checked',true);
    $("#edit-item").find("form").attr("action",url + '/' + id);


});

$(".crud-submit-edit").click(function(e){
    e.preventDefault();

    $('#validation-errorss').html('');

    var form_action = $("#edit-item").find("form").attr("action");
    var name = $("#edit-item").find("input[name='name']").val();
    var email = $("#edit-item").find("input[name='email']").val();
    var gender = $("#edit-item").find("input[name='gender']:checked").val();
    var address = $("#edit-item").find("textarea[name='address']").val();
    var id = $("#edit-item").find("input[name='id']").val();

    // console.log(name)

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{id:id, name:name, email:email, gender:gender, address:address}
    }).done(function(data){
        getPageData();
        $(".modal").modal('hide');
        toastr.success('Data Employee Updated Successfully.', 'Success Alert', {timeOut: 5000});
    }).fail(function (error) {
        if (error.status == 422){
            $.each(error.responseJSON.errors, function(key,value) {
                $('#validation-errorss').append('<li style="background-color: #d9534f; color: white;">'+value+'</li>');
            });
        }
    });
});
