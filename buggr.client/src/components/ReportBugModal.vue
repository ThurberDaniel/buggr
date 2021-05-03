<template>
  <div>
    <button>
    </button>
    const { value: text } = await Swal.fire({
    input: 'textarea',
    inputLabel: 'Message',
    inputPlaceholder: 'Type your message here...',
    inputAttributes: {
    'aria-label': 'Type your message here'
    },
    showCancelButton: true
    })

    if (text) {
    Swal.fire(text)
    }
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
